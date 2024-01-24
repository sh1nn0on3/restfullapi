import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  dosomething() {
    this.authService.doSomething();
    return 'Hello World!';
  }

  @Post('/register')
  register(@Body() body: RegisterDTO) {
    // return body;
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
