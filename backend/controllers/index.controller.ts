import { Request, Response } from "express";
import { pool } from "../model";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import { loginUser } from "../service/index.service";

export interface User {
  nik: number;
  name: string;
  password: string;
}

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server Error");
  }
};

export const getUserByNik = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nik = parseInt(req.params.nik);
  const response: QueryResult = await pool.query(
    "SELECT * FROM users WHERE nik = $1",
    [nik]
  );
  if (response.rowCount == 0) {
    return res.status(400).send("User unavailable");
  }
  return res.json(response.rows);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, nik, password } = req.body;
  const checkUser = await pool.query("SELECT * FROM users WHERE nik = $1", [
    nik,
  ]);
  if (checkUser.rowCount != 0) {
    return res.status(400).send("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await pool.query(
    "INSERT INTO users (name, nik, password) VALUES ($1, $2, $3)",
    [name, nik, hashedPassword]
  );
  return res.json({
    message: "User created successfully",
    body: { user: { name, nik } },
  });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nik = parseInt(req.params.nik);
  const checkUser = await pool.query("SELECT * FROM users WHERE nik = $1", [
    nik,
  ]);
  if (checkUser.rowCount == 0) {
    return res.status(400).send("User doesn't exist");
  }
  var names = req.body.name;
  if (names == null) {
    names = checkUser.rows[0].name;
  }
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await pool.query("UPDATE users SET name = $1, password = $2 WHERE nik = $3", [
    names,
    hashedPassword,
    nik,
  ]);
  return res.json("User " + nik + " Updated Successfully");
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nik = parseInt(req.params.nik);
  const checkUser = await pool.query("SELECT * FROM users WHERE nik = $1", [
    nik,
  ]);
  if (checkUser.rowCount == 0) {
    return res.status(400).send("User doesn't exist");
  }
  await pool.query("DELETE FROM users WHERE nik = $1", [nik]);
  return res.json("User " + nik + " has been deleted");
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const nik = req.body.nik;
  const checkUser = await pool.query("SELECT * FROM users WHERE nik = $1", [
    nik,
  ]);
  if (checkUser.rowCount == 0) {
    return res.status(404).send("User doesn't exist");
  }
  const user: User = checkUser.rows[0];
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send("Not allowed! Incorrect password");
  }
  const token = await loginUser(user);
  return res.send({token: token});
};

// export const profile = (req: Request, res: Response): Response => {
//   return res.send("Success, authorized!");
// };

export const protect = (req: Request, res: Response) => {
    console.log("success!");
    return res.send("hi");
}