import 'tsconfig-paths/register';

import * as Knex from 'knex';
import { env } from '@app/config/environment';

// tslint:disable-next-line: no-any
exports.seed = async (knex: Knex): Promise<any> => {
  const defaultChatRoom = {
    id: env.defaults.chatRoom,
    name: 'Unwind',
  };

  const defaultSystemUser = {
    id: env.defaults.systemUser,
    firstName: 'Unwind',
    lastName: 'System',
    username: 'Unwind_System',

    email: 'zeferinix@zeferinix.com',
    hash: 'This is the system user',
    salt: 'This is the system user',
  };

  const createUserQuery = knex('users').insert([defaultSystemUser]);
  const createRoomQuery = knex('conversation_rooms').insert([defaultChatRoom]);
  const mapUserToRoomQuery = knex('user_conversation_rooms').insert({
      userId: defaultSystemUser.id,
      conversationRoomId: defaultChatRoom.id
  });

  await knex.raw('? ON CONFLICT DO NOTHING', [createUserQuery]);
  await knex.raw('? ON CONFLICT DO NOTHING', [createRoomQuery]);
  await knex.raw('? ON CONFLICT DO NOTHING', [mapUserToRoomQuery]);
};
