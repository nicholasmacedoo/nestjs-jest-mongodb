import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../infra/prisma/prisma.service';

describe('Users', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const userDto = {
    email: 'joedoe@email.com.br',
    name: 'Joe Doe',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    prisma = module.get(PrismaService);

    await app.init();
  });

  describe('CREATE USER', () => {
    test('[POST] /users : should be to create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userDto);

      expect(response.body).toHaveProperty('id');
      expect(response.statusCode).toBe(201);
    });

    test('[POST] /users : should not be possible to create a user with the same email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userDto);

      expect(response.statusCode).toBe(400);
    });

    describe('DELETE USER', () => {
      test('[DELETE] /users - should be delete a user', async () => {
        const userForDelete = await prisma.user.create({
          data: {
            email: 'remove@test.com.br',
            name: 'Teste',
          },
        });
        const response = await request(app.getHttpServer())
          .delete(`/users/${userForDelete.id}`)
          .send();

        expect(response.statusCode).toBe(200);
      });

      test('[DELETE] /users - should not be possible to delete a user if not exists', async () => {
        const exampleObjectId = '64e1f4f73f20f1a9c2b0b9e1';

        const response = await request(app.getHttpServer())
          .delete(`/users/${exampleObjectId}`)
          .send();

        expect(response.statusCode).toBe(400);
      });
    });
  });
});
