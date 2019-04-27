import createSocketIO from 'socket.io';
import { jwtUtil, IJwtPayload } from './utils';
import { userService, messageService } from '@app/services';
import express from 'express';
import { Message } from '@app/models';
import { env } from './config/environment';

export const app = express();
export const server = require('http').Server(app);
const io = createSocketIO(server);
require('socketio-auth')(io, {
  // tslint:disable-next-line: no-any
  authenticate: (socket: any, data: any, callback: any) => {
    const { token } = data;
    let isSuccess: boolean;

    try {
      const { userId } = jwtUtil.verify(token) as IJwtPayload;

      socket.client.userId = userId;

      isSuccess = true;
    } catch (err) {
      isSuccess = false;
      callback(err, isSuccess);
      return;
    }

    callback(null, isSuccess);
  },
  // tslint:disable-next-line: no-any
  postAuthenticate: (socket: any, data: any) => {
    const { token } = data;
    const { userId } = jwtUtil.verify(token) as IJwtPayload;
    socket.client.userId = userId;
  },
});

// tslint:disable-next-line: no-any
const getUserIdFromSocket = (socket: any) => {
  return socket.client.userId;
};

io.on('connection', socket => {
  console.info(`${socket.id} - Connected`);

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
