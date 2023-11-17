import { Injectable } from '@nestjs/common'
import config from './config';

@Injectable()
export class AppService {

  private data: any

  constructor() {
    config.get().then(data => this.data = data)
  }

  getHello(): string {
    console.log(this.data)
    return this.data;
  }
}
