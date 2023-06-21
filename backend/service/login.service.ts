import jwt from "jsonwebtoken";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import { pool } from "../model";

interface User {
  nik: number;
  name: string;
  password: string;
}

const findAllUsers = async (): Promise<User[]> => {
  const response: QueryResult = await pool.query("SELECT * FROM users");
  return response.rows;
};

const findUser = async (nik: number): Promise<User[]> => {
  const response: QueryResult = await pool.query("SELECT * FROM users WHERE nik = $1", [
    nik,
  ]);
  return response.rows;
};

const passwordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const createUser = async (
  name: string,
  nik: number,
  hashedPassword: string
) => {
  await pool.query(
    "INSERT INTO users (name, nik, password) VALUES ($1, $2, $3)",
    [name, nik, hashedPassword]
  );
};

const editUser = async (name: string, nik: number, hashedPassword: string) => {
  await pool.query("UPDATE users SET name = $1, password = $2 WHERE nik = $3", [
    name,
    hashedPassword,
    nik,
  ]);
};

const eraseUser = async (nik: number) => {
  await pool.query("DELETE FROM users WHERE nik = $1", [nik]);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

const generateToken = async (user: User) => {
  // jwt token provision
  const payload = { nik: user.nik, name: user.name };
  const token = jwt.sign(payload, "Random string", { expiresIn: "2h" });
  return token;
};

export {
  findAllUsers,
  findUser,
  passwordHash,
  createUser,
  editUser,
  eraseUser,
  comparePassword,
  generateToken,
};
