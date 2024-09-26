import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  controllers: [AuthenticateController],
  providers: [AuthenticateService, PrismaService],
})
export class AuthenticateModule {}
