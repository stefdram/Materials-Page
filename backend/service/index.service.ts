import jwt from "jsonwebtoken";
import { User } from "../controllers/login.controller";

export const loginUser = async (user: User) => {
  // jwt token provision
  const payload = { nik: user.nik, name: user.name };
  const token = jwt.sign(payload, "Random string", { expiresIn: "2h" });
  return token;
};
