import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync('npx prisma db push');
});

afterAll(async () => {
  await prisma.$disconnect();
});
