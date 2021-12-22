import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import { ConnectionError } from '../errors/connection.error';

export class DatabaseConnection {
  constructor(private options: ConnectionOptions) {}

  public static connection: Connection;

  public connect() {
    return mysql
      .createConnection(this.options)
      .then((connection) => {
        DatabaseConnection.connection = connection;
        return connection.config.database!;
      })
      .catch((error) => {
        return Promise.reject(
          new ConnectionError('DatabaseConnectionError', {
            code: error?.errno ?? 999,
            description: error?.code ?? 'Unknown error',
          }),
        );
      });
  }
}
