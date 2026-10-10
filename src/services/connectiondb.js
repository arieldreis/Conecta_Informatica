import dotenv from 'dotenv/config';
import mysql2 from 'mysql2/promise';
const teste = dotenv.config();

console.log(teste);

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  passwordConfigurada: Boolean(process.env.DB_PASSWORD),
});

export const connection =  mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});