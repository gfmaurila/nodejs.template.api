require('dotenv').config({
  path: `.env.${process.env.ENVIRONMENT || 'development'}`,
});

/** @type {import('sequelize').Options} */
module.exports = {
  dialect: 'mssql',
  host: process.env.SQLSERVER_HOST,
  port: parseInt(process.env.SQLSERVER_PORT || '1433'),
  username: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  database: process.env.SQLSERVER_DB,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  define: {
    freezeTableName: true,
  },
  logging: false,
};
