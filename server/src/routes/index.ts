import { Express } from 'express';
import passport from 'passport';
import { maintenanceRouter } from './v1/maintenance.routes';
import { userRouter } from './v1/user.routes';
import { authRouter } from './v1/auth.routes';
import { conversationRoomsRouter } from './v1/conversation-room.routes';

export const initRoutes = (app: Express) => {
  app.use('/api/v1/maintenance', maintenanceRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), userRouter);
  app.use('/api/v1/conversationRooms', passport.authenticate('jwt', { session: false }), conversationRoomsRouter);
};
