import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Account database
const portString: string | undefined = process.env.DB_PORT;
const port: number = portString ? parseInt(portString, 10) : 5432;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: port,
});

// Create "users" table query if not exists
const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    nik SERIAL PRIMARY KEY,
    name text,
    password text
  );
`;

(async () => {
  const client = await pool.connect();
  try {
    await client.query(createUserTableQuery);
  } catch (error) {
    console.error("Error creating users table:", error);
  } finally {
    client.release();
  }
})();

// Material database
const portStringMaterial: string | undefined = process.env.DB_MATERIAL_PORT;
const port2: number = portStringMaterial
  ? parseInt(portStringMaterial, 10)
  : 5432;

export const poolMaterial = new Pool({
  user: process.env.DB_MATERIAL_USER,
  host: process.env.DB_MATERIAL_HOST,
  database: process.env.DB_MATERIAL_NAME,
  password: process.env.DB_MATERIAL_PASSWORD,
  port: port2,
});

// Create "materials" table query if not exists
const createMaterialTableQuery = `
  CREATE TABLE IF NOT EXISTS materials (
    id integer,
    name text,
    user_nik integer,
    date_added timestamp
  );
`;

(async () => {
  const client = await poolMaterial.connect();
  try {
    await client.query(createMaterialTableQuery);
  } catch (error) {
    console.error("Error creating materials table:", error);
  } finally {
    client.release();
  }
})();

const createDescriptionTableQuery = `
  CREATE TABLE IF NOT EXISTS descriptions (
    id integer PRIMARY KEY,
    description text
  );
`;

(async () => {
  const client = await poolMaterial.connect();
  try {
    await client.query(createDescriptionTableQuery);
  } catch (error) {
    console.error("Error creating descriptions table:", error);
  } finally {
    client.release();
  }
})();