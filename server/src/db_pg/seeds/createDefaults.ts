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
    username: 'Unwind System',

    email: 'zeferinix@zeferinix.com',
    hash: 'This is the system user',
    salt: 'This is the system user',
  };

  const createUserQuery = knex('users').insert([defaultSystemUser]);
  const createRoomQuery = knex('conversation_rooms').insert([defaultChatRoom]);

  await knex.raw('? ON CONFLICT DO NOTHING', [createUserQuery]);
  await knex.raw('? ON CONFLICT DO NOTHING', [createRoomQuery]);
};
