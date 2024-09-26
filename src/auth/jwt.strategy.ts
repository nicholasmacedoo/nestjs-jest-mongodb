import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';

const tokenPayloadSchema = z.object({
  sub: z.string(),
  role: z.enum([Role.ADMIN, Role.BASIC, Role.MANAGER]),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const publicKey = config.get<string>('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: UserPayload) {
    try {
      return tokenPayloadSchema.parse(payload);
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
