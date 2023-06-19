import { Router } from "express";
import { test } from "../controllers/material.controller";

const materialRouter = Router();

materialRouter.get("/test", test);

export default materialRouter;