import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../infra/prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists)
      throw new BadRequestException('User with email already exists');

    const hashedPassword = await hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        role: 'BASIC',
        password: hashedPassword,
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException('Not found user');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user, ${JSON.stringify(updateUserDto)}`;
  }

  async remove(id: string): Promise<void> {
    const userExists = await this.findOne(id);

    if (!userExists) throw new BadRequestException('Not found user');

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
