import { Sequelize } from 'sequelize-typescript';
import { Settings } from '@/core/env/Settings';

export class SqlServerDatabase {
  private static sequelizeInstance: Sequelize;

  public static getInstance(): Sequelize {
    if (!this.sequelizeInstance) {
      this.sequelizeInstance = new Sequelize({
        dialect: 'mssql',
        host: Settings.SqlServerHost,
        port: Settings.SqlServerPort,
        database: Settings.SqlServerDb,
        username: Settings.SqlServerUser,
        password: Settings.SqlServerPassword,
        dialectOptions: {
          options: {
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        },
        define: {
          freezeTableName: true,
        },
        logging: Settings.Debug ? console.log : false,
      });

      // Adicione os models aqui usando this.sequelizeInstance.addModels([UserModel, ...]);
    }

    return this.sequelizeInstance;
  }

  public static async testConnection(): Promise<void> {
    try {
      await this.getInstance().authenticate();
      console.log('Connection to SQL Server has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the SQL Server database:', error);
      throw error;
    }
  }

  public static async createAllTables(): Promise<void> {
    try {
      await this.getInstance().sync({ alter: true }); // Ou alter: false para produção
      console.log('All tables created successfully.');
    } catch (error) {
      console.error('Failed to create tables:', error);
      throw error;
    }
  }
}
