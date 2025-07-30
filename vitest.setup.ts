import * as dotenv from 'dotenv';
import * as path from 'path';

// Caminho até o .env.development
const envPath = path.resolve(__dirname, 'src/core/env/.env.development');
dotenv.config({ path: envPath });
