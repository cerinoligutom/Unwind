import { Express } from 'express';
import { maintenanceRouter } from './v1/maintenance.routes';
import { userRouter } from './v1/user.routes';
import { authRouter } from './v1/auth.routes';

export const initRoutes = (app: Express) => {
  app.use('/api/v1/maintenance', maintenanceRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
};
