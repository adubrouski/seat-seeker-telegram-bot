import createKnexConnection, { Knex } from 'knex';
import appConfig from '../../appconfig.json';

export class DatabaseConnection {
  constructor(private config: Knex.Config) {}

  public static connection: Knex;

  public async connect() {
    try {
      const knex = createKnexConnection(this.config);
      DatabaseConnection.connection = knex;
      await this.createInitialTables(knex);
    } catch (error) {
      console.log(error);
    }
  }

  public async createInitialTables(knex: Knex) {
    try {
      const isCitiesTableExists = await knex.schema.hasTable('cities');
      const isUsersTableExists = await knex.schema.hasTable('users');

      if (!isCitiesTableExists) {
        await knex.schema.createTable('cities', (table) => {
          table.string('city_id', 7).primary();
          table.string('city_name', 30).notNullable();
        });

        await knex('cities').insert(appConfig.cities);
      }

      if (!isUsersTableExists) {
        await knex.schema.createTable('settings', (table) => {
          table.increments('settings_id').primary();
          table.string('departure_city', 30);
          table.string('arrival_city', 30);

          table
            .foreign('departure_city')
            .references('city_id')
            .inTable('cities');
          table.foreign('arrival_city').references('city_id').inTable('cities');
        });

        await knex.schema.createTable('users', (table) => {
          table.integer('id').unsigned().primary();
          table.string('first_name');
          table.string('username', 30).notNullable();
          table.integer('settings').unsigned();

          table
            .foreign('settings')
            .references('settings_id')
            .inTable('settings');
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
