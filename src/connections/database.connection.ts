import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import appConfig from '../../appconfig.json';
import { ConnectionError } from '../errors/connection.error';

export class DatabaseConnection {
  constructor(private options: ConnectionOptions) {}

  public static connection: Connection;

  public connect() {
    return mysql
      .createConnection(this.options)
      .then((connection) => {
        DatabaseConnection.connection = connection;

        return connection;
      })
      .then(async (connection) => {
        await this.init(connection);

        return connection.config.database!;
      })
      .catch((error) =>
        Promise.reject(
          new ConnectionError('DatabaseConnectionError', {
            code: error.errno ?? 999,
            description: error.code ?? 'Unknown error',
          }),
        ),
      );
  }

  public async init(connection: Connection) {
    try {
      await connection.query(
        'CREATE TABLE IF NOT EXISTS `cities` (id VARCHAR(7) NOT NULL, name VARCHAR(12) NOT NULL, PRIMARY KEY (`id`))',
      );
      const [cities]: any = await DatabaseConnection.connection.query(
        'SELECT * FROM `cities`',
      );

      if (!cities.length) {
        await connection.query('INSERT INTO `cities` (id, name) VALUES ?', [
          appConfig.cities,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
