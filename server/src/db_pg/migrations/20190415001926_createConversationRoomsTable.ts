import * as Knex from 'knex';
import { addTimeStamps } from '../helpers/addTimeStamps';

const TABLE_NAME = 'conversation_rooms';

// tslint:disable-next-line: no-any
export async function up(knex: Knex): Promise<any> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema
      .createTable(TABLE_NAME, t => {
        t.uuid('id')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        t.string('name').notNullable();
        t.string('photoUrl');
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
