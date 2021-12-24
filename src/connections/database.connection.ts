import knex, { Knex } from 'knex';
import appConfig from '../../appconfig.json';
import { ConnectionError } from '../errors/connection.error';

export class DatabaseConnection {
  constructor(private config: Knex.Config) {}

  public static connection: Knex;

  public async connect() {
    const gg = knex(this.config);
    try {
      // const ggg = gg.schema
      //   .createTableIfNotExists('test', (table) => {
      //     table.uuid('id').primary();
      //     table.string('name', 32);
      //     table.timestamps();
      //   })
      //   .createTableIfNotExists('test', (table) => {
      //     table.increments();
      //     table.string('name', 32);
      //     table.timestamps();
      //   })
      //   .then(() => null);
      // gg('test')
      //   .insert({ id: gg.raw('UUID()'), name: 'gergererg' })
      //   .then((res) => console.log(res))
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // console.log(ggg);
    } catch (error) {
      console.log(error);
    }

    // return mysql
    //   .createConnection(this.options)
    //   .then((connection) => {
    //     DatabaseConnection.connection = connection;
    //
    //     return connection;
    //   })
    //   .then(async (connection) => {
    //     await this.init(connection);
    //
    //     return connection.config.database!;
    //   })
    //   .catch((error) =>
    //     Promise.reject(
    //       new ConnectionError('DatabaseConnectionError', {
    //         code: error.errno ?? 999,
    //         description: error.code ?? 'Unknown error',
    //       }),
    //     ),
    //   );
  }

  public async init(connection: Knex) {
    try {
      // await connection.query(
      //   'CREATE TABLE IF NOT EXISTS `cities` (id VARCHAR(7) NOT NULL, name VARCHAR(12) NOT NULL, PRIMARY KEY (`id`))',
      // );
      // await connection.query(
      //   'INSERT IGNORE INTO `cities` (id, name) VALUES ?',
      //   [appConfig.cities],
      // );
      // await connection.query(
      //   'CREATE TABLE IF NOT EXISTS `users` (id BIGINT(12) unsigned NOT NULL, name VARCHAR(32) NOT NULL, PRIMARY KEY (`id`))',
      // );
    } catch (error) {
      console.log(error);
    }
  }
}
