import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  doSomething() {
    console.log('do something');
  }

  async register(body: RegisterDTO) {
    const { email, password } = body;
    const hashPassword = await argon.hash(password);
    const user = await this.prismaService.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: 'test',
      },
    });
    return {
      message: 'done ',
      data: user,
    };
  }

  async login(body: LoginDTO) {
    const { email, password } = body;
    const checkUser = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    const checkPassword = await argon.verify(checkUser.password, password);
    if (!checkUser) return { message: 'user not found' };
    if (!checkPassword) return { message: 'password not match' };
    const user = {
      id: checkUser.id,
      email: checkUser.email,
      name: checkUser.name,
    };
    return {
      message: 'done',
      data: user,
    };
  }
}
