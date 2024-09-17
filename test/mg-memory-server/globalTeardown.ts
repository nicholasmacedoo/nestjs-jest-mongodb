import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { config } from './config';

export = async function globalTeardown() {
  if (config.Memory) {
    const instance: MongoMemoryReplSet = (global as any).__MONGOINSTANCE;
    await instance.stop({ doCleanup: false });
  }
};
