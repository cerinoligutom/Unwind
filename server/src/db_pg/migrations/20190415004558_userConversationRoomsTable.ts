import * as Knex from 'knex';

const TABLE_NAME = 'user_conversation_rooms';

// tslint:disable-next-line: no-any
export async function up(knex: Knex): Promise<any> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema.createTable(TABLE_NAME, t => {
      t.uuid('userId').notNullable();
      t.uuid('conversationRoomId').notNullable();

      t.unique(['userId', 'conversationRoomId']);

      t.foreign('userId')
        .references('users.id')
        .onDelete('CASCADE');

      t.foreign('conversationRoomId')
        .references('conversation_rooms.id')
        .onDelete('CASCADE');
    });
  }
}

// tslint:disable-next-line: no-any
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
