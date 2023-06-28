import { Router } from "express";
import {
  test,
  getAllMaterials,
  getMaterialsById,
  getMaterialsByName,
  getAllIds,
  addMaterial,
  updateMaterial,
  deleteMaterialList,
  deleteMaterial,
} from "../controllers/material.controller";
import {
  getAllDescriptions,
  getDescriptionsById,
  editOrCreateDescriptions,
  eraseDescriptionsById,
} from "../controllers/description.controller";
import passport from "passport";
import "../config/passport";

const materialRouter = Router();

materialRouter.get("/test", test);
materialRouter.get(
  "/materials",
  passport.authenticate("jwt", { session: false }),
  getAllMaterials
);
materialRouter.get(
  "/materials/get/ids",
  passport.authenticate("jwt", { session: false }),
  getAllIds
);
materialRouter.get(
  "/materials/:id",
  passport.authenticate("jwt", { session: false }),
  getMaterialsById
);
materialRouter.get(
  "/materials/by/:name",
  passport.authenticate("jwt", { session: false }),
  getMaterialsByName
);
materialRouter.post(
  "/materials/add",
  passport.authenticate("jwt", { session: false }),
  addMaterial
);
materialRouter.put(
  "/materials/edit/:id/:name",
  passport.authenticate("jwt", { session: false }),
  updateMaterial
);
materialRouter.delete(
  "/materials/deletelist/:id",
  passport.authenticate("jwt", { session: false }),
  deleteMaterialList
);
materialRouter.delete(
  "/materials/deleteone",
  passport.authenticate("jwt", { session: false }),
  deleteMaterial
);
materialRouter.get(
  "/materials/get/all-descriptions",
  passport.authenticate("jwt", { session: false }),
  getAllDescriptions
)
materialRouter.get(
  "/materials/get/description/:id",
  passport.authenticate("jwt", { session: false }),
  getDescriptionsById
)
materialRouter.put(
  "/materials/edit/description",
  passport.authenticate("jwt", { session: false }),
  editOrCreateDescriptions
)
materialRouter.delete(
  "/materials/delete/description/:id",
  passport.authenticate("jwt", { session: false }),
  eraseDescriptionsById
)

export default materialRouter;
