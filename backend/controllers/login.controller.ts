import { Request, Response } from "express";
import {
  findAllUsers,
  findUser,
  passwordHash,
  createUser,
  editUser,
  eraseUser,
  comparePassword,
  generateToken,
} from "../service/login.service";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allUsers = await findAllUsers();
    return res.status(200).json(allUsers);
  } catch (e) {
    return res.status(500).json("Internal Server Error: " + e);
  }
};

export const getUserByNik = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nik = parseInt(req.params.nik);
  const user = await findUser(nik);
  if (user.length === 0) {
    return res.status(400).send("User unavailable");
  }
  return res.status(200).json(user[0]);
};

export const signupUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, nik, password } = req.body;
  const checkUser = await findUser(nik);
  // check if nik is 8 digits
  if (!/^\d{8}$/.test(nik)) {
    return res.status(405).send("nik must be 8 digits");
  }
  if (
    name === null ||
    password === null ||
    name.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(405).send("name and password must be filled");
  }
  // check if user already exists
  if (checkUser.length !== 0) {
    return res.status(400).send("User already exists");
  }
  const trimmedName = name.trim();
  const trimmedPassword = password.trim();
  const hashedPassword = await passwordHash(trimmedPassword);
  await createUser(trimmedName, nik, hashedPassword);
  return res.json({
    message: "User created successfully",
    body: { user: { name: trimmedName, nik } },
  });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nik = parseInt(req.params.nik);
  const checkUser = await findUser(nik);
  if (checkUser.length === 0) {
    return res.status(400).send("User doesn't exist");
  }
  var names = req.body.name;
  if (names == null) {
    names = checkUser[0].name;
  }
  const password = req.body.password;
  const hashedPassword = await passwordHash(password);

  await editUser(names, nik, hashedPassword);

  return res.json("User " + nik + " Updated Successfully");
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nik = parseInt(req.params.nik);
  const checkUser = await findUser(nik);
  if (checkUser.length === 0) {
    return res.status(400).send("User doesn't exist");
  }
  await eraseUser(nik);
  return res.json("User " + nik + " has been deleted");
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const nik = req.body.nik;
  const checkUser = await findUser(nik);
  if (checkUser.length === 0) {
    return res.status(404).send("User doesn't exist");
  }
  const user = checkUser[0];
  if (!(await comparePassword(req.body.password, user.password))) {
    return res.status(400).send("Not allowed! Incorrect password");
  }
  const token = await generateToken(user);
  return res.send({ name: user.name, token: token });
};

export const protect = (req: Request, res: Response) => {
  console.log("success!");
  return res.send("hi");
};

export const comparePass = async (req: Request, res: Response) => {
  const userPass = req.body.userPassword;
  const inputPass = req.body.inputPassword;
  if (!(await comparePassword(inputPass, userPass))) {
    return res.send(false);
  }
  return res.send(true);
}