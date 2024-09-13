import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../infra/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists)
      throw new BadRequestException('User with email already exists');

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
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
