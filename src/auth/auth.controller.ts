import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  dosomething() {
    this.authService.doSomething();
    return 'Hello World!';
  }

  @Post('/register')
  register(@Req() request: Request) {
    // return this.authService.register();
    return request.body;
  }

  @Post('/login')
  login() {
    return this.authService.login();
  }
}
