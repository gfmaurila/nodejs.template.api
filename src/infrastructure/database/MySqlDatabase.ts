import mysql, { Connection } from 'mysql2/promise';
import { Settings } from '@/core/env/Settings';

export class MySqlDatabase {
  public static async getConnection(): Promise<Connection> {
    return await mysql.createConnection({
      host: Settings.MySqlHost,
      port: Settings.MySqlPort,
      user: Settings.MySqlUser,
      password: Settings.MySqlPassword,
      database: Settings.MySqlDatabase,
    });
  }

  public static async testConnection(): Promise<void> {
    try {
      console.log('Iniciando conexão com o MySQL...');

      const connection = await this.getConnection();
      const [rows] = await connection.execute(`SELECT 'ok' AS status`);
      console.log('Conexão bem-sucedida.');
      console.log('Resultado:', rows);

      await connection.end();
      console.log('Conexão encerrada.');
    } catch (error) {
      console.error('Erro ao conectar no MySQL:');
      console.error(error);
      throw error;
    }
  }
}
