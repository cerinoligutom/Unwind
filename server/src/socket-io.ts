import createSocketIO from 'socket.io';
import { jwtUtil, IJwtPayload } from './utils';
import { userService, messageService } from '@app/services';
import express from 'express';
import { Message } from '@app/models';
import { env } from './config/environment';

export const app = express();
export const server = require('http').Server(app);
const io = createSocketIO(server);

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const { token } = socket.handshake.query;

    try {
      const { userId } = jwtUtil.verify(token) as IJwtPayload;

      // tslint:disable-next-line: no-any
      (socket.client as any).userId = userId;

      return next();
    } catch (err) {
      return next(new Error('Authentication error'));
    }
  }

  return next(new Error('No token provided'));
});

// tslint:disable-next-line: no-any
const getUserIdFromSocket = (socket: any) => {
  return socket.client.userId;
};

io.on('connection', socket => {
  console.info(`${socket.id} - Connected`);

  socket.emit('authenticated');

  socket.on('Connect to rooms', async () => {
    const userId = getUserIdFromSocket(socket);

    const conversationRooms = await userService.getConversationRooms(userId);

    if (conversationRooms) {
      conversationRooms.forEach(room => {
        socket.join(room.id);
        console.info(`${socket.id} - Joined room ${room.id}`);
      });
    }
  });

  socket.on('Join room', async (conversationRoomId: string) => {
    socket.join(conversationRoomId);
  });

  socket.on('Leave room', async (conversationRoomId: string) => {
    socket.leave(conversationRoomId);
  });

  socket.on('disconnect', async () => {
    socket.leaveAll();
    console.info(`${socket.id} - Disconnected`);
  });
});

app.use((req, res, next) => {
  // tslint:disable-next-line: no-any
  (res as any).io = io;
  next();
});

export const broadcastMessage = (message: Message) => {
  io.in(message.conversationRoomId).emit('New message', message);
};

export const broadcastParticipantJoinedTheRoom = async (message: Message) => {
  io.in(message.conversationRoomId).emit('New message', message);
};

export const broadcastParticipantLeftTheRoom = async (message: Message) => {
  io.in(message.conversationRoomId).emit('New message', message);
};
