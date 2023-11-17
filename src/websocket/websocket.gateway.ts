import { WebSocketServer } from '@nestjs/websockets'
import { Server, WebSocket } from 'ws'

export abstract class WebsocketGateway {

  @WebSocketServer() server: Server

  afterInit() {
    console.log('websocket server start...')
    this.server.on('connection', (client: WebSocket, request: any) => {
      // entry
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      let _conn = '', _mess = '', _clss = ''
      for (let method of methods) {
        Reflect.getMetadata('connect', this, method) && (_conn = method)
        Reflect.getMetadata('message', this, method) && (_mess = method)
        Reflect.getMetadata('close', this, method) && (_clss = method)
      }
      console.log(_conn, _mess, _clss)
      _conn && this[_conn](client, request)
      // message
      client?.on('message', (message: Buffer) => {
        _mess && this[_mess](client, message)
      })
      // close
      client?.on('close', (code: number, reason: any) => {
        _clss && this[_clss](code, reason)
      })
    })
  }

}
