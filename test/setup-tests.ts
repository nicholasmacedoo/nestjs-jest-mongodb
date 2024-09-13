import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();
let mongod: MongoMemoryReplSet;

beforeAll(async () => {
  mongod = await MongoMemoryReplSet.create({ replSet: { count: 1 } });

  const uri = mongod.getUri('tests');

  process.env.DATABASE_URL = uri;
  execSync(`set DATABASE_URL=${uri}`, { stdio: 'inherit' });
  execSync('npx prisma db push');
});

afterAll(async () => {
  await Promise.all([
    prisma.$runCommandRaw({
      delete: 'User',
      deletes: [
        {
          q: {}, // Sem filtros, então deletará todos os documentos
          limit: 0, // 0 significa sem limites, deletar tudo
        },
      ],
    }),
    prisma.$disconnect(),
    mongod.stop(),
  ]);
  // await
  // await

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // await;
  console.log('tudo certo');
});
