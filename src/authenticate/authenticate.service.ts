import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

interface AuthenticateRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ email, password }: AuthenticateRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new UnauthorizedException('User credentials do not match.');

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('User credentials do not match.');

    const accessToken = this.jwtService.sign({ sub: user.id, role: user.role });

    delete user.password;

    return {
      user,
      access_token: accessToken,
    };
  }
}
