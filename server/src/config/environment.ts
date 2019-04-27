require('dotenv').config();

const currentNodeEnvironment = `${process.env.NODE_ENV}`.toLowerCase();

export const env = {
  host: '0.0.0.0',
  nodeEnv: currentNodeEnvironment || 'development',
  port: 8080,
  isProduction: currentNodeEnvironment === 'production',

  redisUrl: `${process.env.REDIS_URL}`,

  defaults: {
    systemUser: '11111111-1111-1111-1111-111111111111',
    chatRoom: '11111111-1111-1111-1111-111111111111',
  },
};

if (!env.redisUrl) {
  throw new Error('Redis URL not provided.');
}
