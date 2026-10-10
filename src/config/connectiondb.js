import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import mysql2 from 'mysql2/promise';

// Resolve o .env na raiz do projeto independentemente da pasta de execução.
dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) });

export const connection = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306)
});
