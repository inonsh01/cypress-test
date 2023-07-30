import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export type UserInfo = {
  username: string;
  password: string;
};
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Body() userInfo: UserInfo) {
    return this.appService.login(userInfo);
  }
}
