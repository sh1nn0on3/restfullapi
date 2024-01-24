import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}
