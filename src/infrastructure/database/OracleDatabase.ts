import oracledb, { Connection } from 'oracledb';
import { Settings } from '@/core/env/Settings';

export class OracleDatabase {
  private static isInitialized = false;

  public static async getConnection(): Promise<Connection> {
    if (!this.isInitialized && oracledb.thin) {
      oracledb.initOracleClient({ libDir: Settings.OracleLibDir });
      this.isInitialized = true;
    }

    const dsn = `${Settings.OracleHost}:${Settings.OraclePort}/${Settings.OracleSid}`;

    return await oracledb.getConnection({
      user: Settings.OracleUser,
      password: Settings.OraclePassword,
      connectString: dsn,
    });
  }

  public static async testConnection(): Promise<void> {
    try {
      console.log('Iniciando conexão com o Oracle...');

      const connection = await this.getConnection();
      const result = await connection.execute(`SELECT 'ok' FROM dual`);

      console.log('Conexão bem-sucedida.');
      console.log('Resultado:', result.rows);

      await connection.close();
      console.log('Conexão encerrada.');
    } catch (error) {
      console.error('Erro ao conectar no Oracle:');
      console.error(error);
      throw error;
    }
  }
}
