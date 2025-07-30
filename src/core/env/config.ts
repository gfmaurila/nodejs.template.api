import * as path from 'path';
import * as dotenv from 'dotenv';

const ENVIRONMENT = process.env.ENVIRONMENT?.toLowerCase() || 'development';

const ENV_PATHS: Record<string, string> = {
  development: path.resolve(__dirname, '.env.development'),
  docker: path.resolve(__dirname, '.env.docker'),
  homolog: path.resolve(__dirname, '.env.homolog'),
  production: path.resolve(__dirname, '.env.production'),
};

dotenv.config({ path: ENV_PATHS[ENVIRONMENT] || ENV_PATHS['development'] });

export const Environment = ENVIRONMENT;
