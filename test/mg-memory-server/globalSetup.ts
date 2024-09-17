import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { config } from './config';
import { execSync } from 'node:child_process';

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
    const uri = instance.getUri(config.Database);

    (global as any).__MONGOINSTANCE = instance;
    process.env.DATABASE_URL = uri;

    execSync('npx prisma db push');
  } else {
    process.env.DATABASE_URL = `mongodb://${config.IP}:${config.Port}/${config.Database}`;
  }
};
