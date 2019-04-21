import 'tsconfig-paths/register';
import { env } from '@app/config/environment';

import compression from 'compression';
import cors from 'cors';
import express from 'express';

import passport from 'passport';
import './passport-strategies';

import { initRoutes } from './routes';

import knex from './db_pg/knex-config';
import { customErrorMiddleware } from './middlewares/error.middleware';
import helmet from 'helmet';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const startApp = async () => {
  // Test postgres db
  try {
    await knex.raw('select 1+1 as result');
    console.info('[OK] PG DB');
  } catch (err) {
    console.error('[FAIL] PG DB');
    console.error(err);
    return;
  }

  app.use(cors());
  app.use(express.json());
  app.use(compression());
  app.use(helmet());
  app.use(passport.initialize());

  initRoutes(app);

  // Basic error middleware
  app.use(customErrorMiddleware());

  io.on('connection', () => {
    console.info('a user is connected');
  });

  server.listen(env.port, env.host, () => {
    // tslint:disable-next-line:no-console
    console.info(`Server is now up @ ${env.host}:${env.port}`);
  });
};
startApp();
