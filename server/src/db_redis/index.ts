import redis from 'redis';
import { env } from '@app/config/environment';
import { promisify } from 'util';

const client = redis.createClient(env.redisUrl);

export const redisClient = {
  get: promisify(client.get).bind(client),
  setex: promisify(client.setex).bind(client),
};

client.on('connect', () => {
  console.info('[OK] Redis DB');
});

client.on('error', () => {
  console.info('[FAIL] Redis DB');
});
