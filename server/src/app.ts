import 'tsconfig-paths/register';
import { env } from '@app/config/environment';

import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import { initRoutes } from './routes';

import knex from './db_pg/knex-config';

const app = express();

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

  initRoutes(app);

  // Basic error middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error message in our server's console
    console.error(err.message);

    // All HTTP requests must have a response, so let's send back an error with its status code and message
    res.status(500).send({
      errors: {
        message: err.message,
        data: env.isProduction ? {} : err,
      },
    });
  });

  app.listen(env.port, env.host, () => {
    // tslint:disable-next-line:no-console
    console.info(`Server is now up @ ${env.host}:${env.port}`);
  });
};
startApp();
