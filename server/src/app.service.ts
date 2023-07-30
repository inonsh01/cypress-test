import { Injectable } from '@nestjs/common';
import { UserInfo } from './app.controller';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(userInfo: UserInfo): boolean {
    console.log('userInfo: ', userInfo);
    const user = DB.find((user) => {
      return (
        user.username === userInfo.username &&
        user.password === userInfo.password
      );
    });

    console.log('!!user: ', !!user);
    console.log('user: ', user);
    return !!user;
  }
}

const DB = [
  {
    username: 'bar',
    password: 'gay',
  },
];
