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
      const isSettingsTableExists = await knex.schema.hasTable('settings');

      if (!isCitiesTableExists) {
        await knex.schema.createTable('cities', (table) => {
          table.string('id', 7).primary();
          table.string('name', 30).notNullable();
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
          table.increments('id').primary();
          table.integer('user_id').notNullable();
          table.string('city_from', 7).notNullable();
          table.string('city_to', 7).notNullable();

          table.foreign('user_id').references('id').inTable('users');
          table.foreign('city_from').references('id').inTable('cities');
          table.foreign('city_to').references('id').inTable('cities');
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
