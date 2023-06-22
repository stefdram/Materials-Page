import { Router } from "express";
import {
  test,
  getAllMaterials,
  getMaterialsById,
  getMaterialsByName,
  addMaterial,
  updateMaterial,
  deleteMaterialList,
  deleteMaterial,
} from "../controllers/material.controller";
import passport from "passport";
import "../config/passport";

const materialRouter = Router();

materialRouter.get("/test", test);
materialRouter.get("/materials", passport.authenticate('jwt', { session: false }), getAllMaterials);
materialRouter.get("/materials/:id", passport.authenticate('jwt', { session: false }), getMaterialsById);
materialRouter.get("/materials/by/:name", passport.authenticate('jwt', { session: false }), getMaterialsByName);
materialRouter.post("/materials/add", passport.authenticate('jwt', { session: false }), addMaterial);
materialRouter.put("/materials/edit/:id/:name", passport.authenticate('jwt', { session: false }), updateMaterial);
materialRouter.delete("/materials/deletelist/:id", passport.authenticate('jwt', { session: false }), deleteMaterialList);
materialRouter.delete("/materials/deleteone", passport.authenticate('jwt', { session: false }), deleteMaterial);

export default materialRouter;
