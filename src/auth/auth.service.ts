import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  doSomething() {
    console.log('do something');
  }

  register() {
    return {
      message: 'register ',
    };
  }

  login() {
    return {
      message: 'login',
    };
  }
}
