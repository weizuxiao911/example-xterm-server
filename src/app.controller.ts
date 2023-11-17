import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

// 请求创建参数
export class CreateRequestDTO {
  
}

@ApiTags('API接口')
@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('/v1')
  test() {
    return 'hello'
  }

  @Post('/create')
  async getHello(@Body() props: CreateRequestDTO): Promise<any> {
    return this.appService.getHello();
  }

}
