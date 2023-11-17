import utils from './utils'
import { Subscribe, WsController } from './websocket/websocket.decorator'
import * as pty from 'node-pty'

@WsController('/cli/exec')
export class CliGateway {

    constructor(
        
    ) { }

    @Subscribe('connect')
    async handleConnect(socket: WebSocket, request: any) {
        // validate
        console.log(request?.url)
        const query = utils.query.parse(request)
        // term
        const options = {
            name: 'xterm-color',
            cols: 80, 
            rows: 30,
            cwd: '/'
        }
        const s = decodeURIComponent(query?.e)
        const l = s.split(' ')
        const c = s.slice(0, 1)
        const term = pty.spawn(c, l.join(' '), options)
        term.onData((data) => {
            socket?.send(data)
        })
        term.onExit(e => {
            console.log(e)
            socket?.close()
        })
        // local storage
        socket['term'] = term
    }

    @Subscribe('message')
    async handleMessage(socket: WebSocket, message: Buffer) {
        const term = socket['term']
        const received = message.toString('utf-8')
        if (received.startsWith('#resize#')) {
            const s = received.replace('#resize#', '').trim().split(' ')
            const cols = Number(s[0] ?? 80)
            const rows = Number(s[1] ?? 30)
            try {
                term?.resize(cols, rows)
            } catch (error) {
                console.error(error)
            }
        } else {
            term?.write(`${message}`)
        }
    }

    @Subscribe('close')
    async handleClose(socket: WebSocket, code: number) {
        const term = socket['term']
        term?.write('exit\r\n')
        // 删除连接
    }
}
