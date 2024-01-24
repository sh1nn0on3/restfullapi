import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  dosomething() {
    this.authService.doSomething();
    return 'Hello World!';
  }

  @Post('/register')
  register() {
    return this.authService.register();
  }

  @Post('/login')
  login() {
    return this.authService.login();
  }
}
