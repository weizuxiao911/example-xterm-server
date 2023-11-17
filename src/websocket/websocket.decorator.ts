import { WebSocketGateway } from '@nestjs/websockets'
import { WebsocketGateway } from './websocket.gateway';

export const Subscribe = (key: 'connect' | 'message' | 'close'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('Subscribe:', target, key, propertyKey)
    Reflect.defineMetadata(key, true, target, propertyKey)
  }
}

export const WsController = (route?: string): ClassDecorator => {
  return (target: any) => {
    Object.setPrototypeOf(target.prototype, WebsocketGateway.prototype)
    console.log('WsController:', target, route ?? '')
    target = WebSocketGateway({ path: route ?? '' })(target)
    return target
  };
}