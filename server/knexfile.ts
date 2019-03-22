import { Config } from 'knex';

export const config: Config = {
  client: 'pg',
  connection: {
    host: 'db',
    user: 'postgres',
    password: 'password',
    database: 'unwind',
    debug: true
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/db_pg/migrations',
  },
  seeds: {
    directory: './src/db_pg/seeds',
  },
};

export default config; // For application use
module.exports = config; // For CLI use