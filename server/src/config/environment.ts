require('dotenv').config();

const currentNodeEnvironment = `${process.env.NODE_ENV}`.toLowerCase();

export const env = {
  host: '0.0.0.0',
  nodeEnv: currentNodeEnvironment || 'development',
  port: 8080,
  isProduction: currentNodeEnvironment === 'production'
};
