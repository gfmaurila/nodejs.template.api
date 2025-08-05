const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const env = process.env.ENVIRONMENT || 'development';
const envPath = path.resolve(__dirname, '../../../../src/core/env', `.env.${env}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error(`Arquivo .env.${env} não encontrado em ${envPath}`);
  process.exit(1);
}

module.exports = {
  dialect: 'mssql',
  username: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  database: process.env.SQLSERVER_DB,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      server: process.env.SQLSERVER_HOST,
      port: parseInt(process.env.SQLSERVER_PORT || '1433'),
    },
  },
  define: {
    freezeTableName: true,
  },
  logging: false,
};
