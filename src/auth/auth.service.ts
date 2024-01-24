import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

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
