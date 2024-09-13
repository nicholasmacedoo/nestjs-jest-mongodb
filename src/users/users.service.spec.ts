import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

// import { UsersController } from './users.controller';
import { PrismaService } from '../infra/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('UsersService', () => {
  let service: UsersService;
  let user: User;

  const userDto = {
    email: 'joedoe@email.com.br',
    name: 'Joe Doe',
  };
  // let prismaMock: ReturnType<typeof mockDeep>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be to create a user', async () => {
    user = await service.create(userDto);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', userDto.name);
  });
  it('should not be possible to create a user with the same email', async () => {
    await expect(service.create(userDto)).rejects.toThrow(BadRequestException);
  });
});
