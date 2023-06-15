import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "login_db",
    password: "testing1",
    port: 5000,
});