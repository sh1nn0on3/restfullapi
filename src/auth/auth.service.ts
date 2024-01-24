import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  doSomething() {
    console.log('do something');
  }

  async register(body: RegisterDTO) {
    const { email, password } = body;
    const hashPassword = await argon.hash(password);
    try {
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
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('email already exist');
      }
      return {
        message: 'error',
        data: error,
      };
    }
  }

  async login(body: LoginDTO) {
    const { email, password } = body;
    try {
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
      const token = await this.convertTokenToUser(user.id, user.email);
      return {
        message: 'done',
        data: token,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return { message: 'email already exist' };
      }
      return {
        message: 'error',
        data: error,
      };
    }
  }

  async convertTokenToUser(userId: number, email: string) {
    const payload = { userId: userId, email: email };
    return this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }
}
