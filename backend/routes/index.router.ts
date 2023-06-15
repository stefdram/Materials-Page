import { Router } from "express";
import {
  getUsers,
  getUserByNik,
  createUser,
  updateUser,
  deleteUser,
  login,
  protect,
} from "../controllers/index.controller";
import passport from "passport";
import "../config/passport";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:nik", getUserByNik);
router.post("/users/signup", createUser);
router.put("/users/:nik", updateUser);
router.delete("/users/:nik", deleteUser);
router.post("/users/login", login);
router.get("/test", passport.authenticate('jwt', { session: false }), protect);

export default router;
