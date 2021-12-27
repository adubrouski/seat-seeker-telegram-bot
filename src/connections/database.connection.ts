import createKnexConnection, { Knex } from 'knex';
import { v4 as uuid4 } from 'uuid';
import appConfig from '../../appconfig.json';
import { ConnectionError } from '../errors/connection.error';

export class DatabaseConnection {
  constructor(private config: Knex.Config) {}

  public static connection: Knex;

  public async connect() {
    const knex = createKnexConnection(this.config);
    DatabaseConnection.connection = knex;
    try {
      this.createInitialTables(knex);

      // gg('test')
      //   .insert({ id: uuid4(), name: 'gergererg' })
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

  public async createInitialTables(knex: Knex) {
    const isCitiesTableExists = await knex.schema.hasTable('cities');
    const isUsersTableExists = await knex.schema.hasTable('users');
    const isSettingsTableExists = await knex.schema.hasTable('settings');
    console.log(await knex('settings').select());
    console.log(
      await knex('settings as s')
        .join('users as u', 'u.id', 's.user_id')
        .join('cities as ct', 'ct.id', 's.city_from')
        .join('cities as cf', 'cf.id', 's.city_to')
        .select(
          'cf.name as cityFrom',
          'ct.name as cityTo',
          'u.name as username',
        ),
    );
    if (!isCitiesTableExists) {
      await knex.schema.createTable('cities', (table) => {
        table.string('id').primary();
        table.string('name', 30);
      });

      await knex('cities').insert(appConfig.cities);
    }

    if (!isUsersTableExists) {
      await knex.schema.createTable('users', (table) => {
        table.integer('id').primary();
        table.string('name', 30);
      });
    }

    if (!isSettingsTableExists) {
      await knex.schema.createTable('settings', (table) => {
        table.increments('id');
        table.integer('user_id');
        table.string('city_from', 7);
        table.string('city_to', 7);

        table.foreign('user_id').references('id').inTable('users');
        table.foreign('city_from').references('id').inTable('cities');
        table.foreign('city_to').references('id').inTable('cities');
      });
    }
  }
}
