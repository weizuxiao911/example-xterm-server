import * as yaml from 'yaml'
import * as path from 'path'
import * as fs from 'fs'

const ENV = '.env'
const FILENAME = 'config.yaml'

const config = {
 
    async get(prop?: string): Promise<any> {
        const str = await fs.promises.readFile(path.join(process.cwd(), ENV, FILENAME), { encoding: 'utf-8' })
        const props = yaml.parse(str)
        if (!prop) {
            return props
        }
        const keys = prop.split(/\./g).filter((it: string) => it)
        return keys.reduce((obj, k) => {
            if (!obj) {
                return null
            }
            return obj[k]
        }, props)
    }
}

export default config