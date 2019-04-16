import * as Knex from 'knex';
import { addTimeStamps } from '../helpers/addTimeStamps';

const TABLE_NAME = 'messages';

// tslint:disable-next-line: no-any
export async function up(knex: Knex): Promise<any> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema
      .createTable(TABLE_NAME, t => {
        t.uuid('id')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));

        t.uuid('conversationRoomId').notNullable();
        t.uuid('senderId').notNullable();

        t.text('text').notNullable();
        t.boolean('isEdited').defaultTo(false).notNullable();

        t.foreign('conversationRoomId')
          .references('conversation_rooms.id')
          .onDelete('CASCADE');
        t.foreign('senderId')
          .references('users.id')
          .onDelete('SET NULL');
      })
      .then(async () => {
        await addTimeStamps(knex, TABLE_NAME);
      });
  }
}

// tslint:disable-next-line: no-any
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
