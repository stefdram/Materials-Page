import { Request, Response } from "express";
import {
  findAllMaterials,
  findMaterialsById,
  findMaterialsByName,
  setCurrentJakartaTime,
  findMaterialByIdAndName,
  findAllIds,
  createNewMaterial,
  editMaterial,
  eraseMaterialsById,
  eraseMaterialByIdAndName,
} from "../service/material.service";

export interface Material {
  id: number;
  name: string;
  user_nik: number;
  date_added: Date;
}

export const test = () => {
  console.log("test");
};

export const getAllMaterials = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const materials = await findAllMaterials();
    return res.status(200).json(materials);
  } catch (e) {
    return res.status(500).json("Internal Server Error " + e);
  }
};

export const getMaterialsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const materials = await findMaterialsById(id);
  if (materials.length === 0) {
    return res.status(400).send("Material unavailable");
  }
  return res.status(200).json(materials);
};

export const getMaterialsByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.params;
  const materials = await findMaterialsByName(name);
  if (materials.length === 0) {
    return res.status(400).send("Material unavailable");
  }
  return res.status(200).json(materials);
};

export const getAllIds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const ids = await findAllIds();
    return res.status(200).json(ids);
  } catch (e) {
    return res.status(500).json("Internal Server Error " + e);
  }
};

export const addMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name, user_nik } = req.body;
  const date_added = setCurrentJakartaTime();
  // Check if user_nik is exactly 8 digits
  if (!/^\d{8}$/.test(user_nik)) {
    return res.status(405).send("user_nik must be 8 digits");
  }
  // Check if id is null
  if (id === null) {
    return res.status(403).send("id must not be empty");
  }
  // Check if name is empty
  if (name === null || name.trim() === "") {
    return res.status(406).send("name must not be empty");
  }
  const material = await findMaterialByIdAndName(id, name.trim());
  // Check if material exists
  if (material.length !== 0) {
    return res.status(400).send("Material already exists");
  }
  const trimmedName = name.trim();
  await createNewMaterial(id, trimmedName, user_nik, date_added);
  return res.status(200).json({
    message: "Material added successfully",
    body: { material: { id, name: trimmedName, user_nik, date_added } },
  });
};

export const updateMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name } = req.params;
  const checkMaterial = await findMaterialByIdAndName(Number(id), name);
  // Check if material exists
  if (checkMaterial.length === 0) {
    return res.status(400).send("Material unavailable");
  }
  const newName = req.body.name;
  const trimmedNewName = newName.trim();
  await editMaterial(trimmedNewName, name, Number(id));
  return res.json({
    message: "Material updated successfully",
    body: { material: { id, trimmedNewName } },
  });
};

export const deleteMaterialList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const checkMaterial = await findMaterialsById(Number(id));
  // Check if material exists
  if (checkMaterial.length === 0) {
    return res.status(400).send("Material unavailable");
  }
  await eraseMaterialsById(Number(id));
  return res.json({
    message: "Material List deleted successfully",
    body: { material: { id } },
  });
};

export const deleteMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name } = req.body;
  const trimmedName = name.trim();
  const checkMaterial = await findMaterialByIdAndName(Number(id), trimmedName);
  // Check if material exists
  if (checkMaterial.length == 0) {
    return res.status(400).send("Material unavailable");
  }
  await eraseMaterialByIdAndName(id, trimmedName);
  return res.json({
    message: "Material deleted successfully",
    body: { material: { id, name: trimmedName } },
  });
};
