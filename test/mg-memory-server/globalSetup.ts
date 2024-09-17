import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { config } from './config';

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
    const uri = instance.getUri(config.Database);

    (global as any).__MONGOINSTANCE = instance;
    process.env.DATABASE_URL = uri;
  } else {
    process.env.DATABASE_URL = `mongodb://${config.IP}:${config.Port}/${config.Database}`;
  }
};
