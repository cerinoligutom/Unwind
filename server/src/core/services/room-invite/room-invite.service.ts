import { redisClient } from '@app/redis';
import uuid from 'uuid';

const PREFIX = 'invitation-link:';

const createInvitationKey = async (roomId: string) => {
  const key = uuid.v4();
  const expiryDuration = 30;

  await redisClient.setex(PREFIX + key, expiryDuration, roomId);

  return key;
};

const getRoomIdFromInvitationKey = async (key: string) => {
  return redisClient.get(PREFIX + key);
};

export const roomInviteService = {
  createInvitationKey,
  getRoomIdFromInvitationKey,
};
