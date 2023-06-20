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

const materialRouter = Router();

materialRouter.get("/test", test);
materialRouter.get("/materials", getAllMaterials);
materialRouter.get("/materials/:id", getMaterialsById);
materialRouter.get("/materials/by/:name", getMaterialsByName);
materialRouter.post("/materials/add", addMaterial);
materialRouter.put("/materials/edit/:id/:name", updateMaterial);
materialRouter.delete("/materials/deletelist/:id", deleteMaterialList);
materialRouter.delete("/materials/deleteone", deleteMaterial);

export default materialRouter;
