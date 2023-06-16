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
