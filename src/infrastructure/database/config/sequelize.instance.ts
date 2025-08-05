// src/infrastructure/database/config/sequelize.instance.ts
import { Sequelize } from 'sequelize';
import { Settings } from '@/core/env/Settings';

export const sequelize = new Sequelize(Settings.SQLALCHEMY_DATABASE_URL, {
  dialect: 'mssql',
  logging: false,
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});
