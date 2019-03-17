import { maintenanceRouter } from './maintenance/maintenance.routes';
import { Express } from 'express';

export const initRoutes = (app: Express) => {
  app.use('/api/maintenance', maintenanceRouter);
};
