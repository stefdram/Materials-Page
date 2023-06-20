import { Request, Response } from "express";
import { poolMaterial } from "../model";
import { QueryResult } from "pg";

export interface Material {
  material_id: number;
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
    const response: QueryResult = await poolMaterial.query(
      "SELECT id, name, user_nik, to_char(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added FROM materials"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server Error");
  }
};

export const getMaterialsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await poolMaterial.query(
    "SELECT id, name, user_nik, to_char(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added FROM materials WHERE id = $1",
    [id]
  );
  if (response.rowCount == 0) {
    return res.status(400).send("Material unavailable");
  }
  return res.json(response.rows);
};

export const getMaterialsByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.params;
  const response: QueryResult = await poolMaterial.query(
    "SELECT id, name, user_nik, to_char(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added FROM materials WHERE name = $1",
    [name]
  );
  if (response.rowCount == 0) {
    return res.status(400).send("Material unavailable");
  }
  return res.json(response.rows);
};

export const addMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name, user_nik } = req.body;
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  console.log(timezoneOffset);
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
  const date_added = currentDate.toISOString();
  const checkMaterial = await poolMaterial.query(
    "SELECT * FROM materials WHERE name = $1 AND id = $2",
    [name, id]
  );
  // Check if user_nik is exactly 8 digits
  if (!/^\d{8}$/.test(user_nik)) {
    return res.status(400).send("user_nik must be 8 digits");
  }
  // Check if name is empty
  if (name === "") {
    return res.status(400).send("name must not be empty");
  }
  // Check if user_nik is already registered
  if (checkMaterial.rowCount != 0) {
    return res.status(400).send("Material already exists");
  }
  await poolMaterial.query(
    "INSERT INTO materials (id, name, user_nik, date_added) VALUES ($1, $2, $3, $4)",
    [id, name, user_nik, date_added]
  );
  return res.json({
    message: "Material added successfully",
    body: { material: { id, name, user_nik, date_added } },
  });
};

export const updateMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name } = req.params;
  const checkMaterial = await poolMaterial.query(
    "SELECT * FROM materials WHERE id = $1 AND name = $2",
    [id, name]
  );
  if (checkMaterial.rowCount == 0) {
    return res.status(400).send("Material unavailable");
  }
  const newName = req.body.name;
  await poolMaterial.query("UPDATE materials SET name = $1 WHERE name = $2 AND id = $3", [
    newName,
    name,
    id,
  ]);
  return res.json({
    message: "Material updated successfully",
    body: { material: { id, newName } },
  });
};

export const deleteMaterialList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const checkMaterial = await poolMaterial.query(
    "SELECT * FROM materials WHERE id = $1",
    [id]
  );
  if (checkMaterial.rowCount == 0) {
    return res.status(400).send("Material unavailable");
  }
  await poolMaterial.query("DELETE FROM materials WHERE id = $1", [id]);
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
  const checkMaterial = await poolMaterial.query(
    "SELECT * FROM materials WHERE id = $1 AND name = $2",
    [id, name]
  );
  if (checkMaterial.rowCount == 0) {
    return res.status(400).send("Material unavailable");
  }
  await poolMaterial.query(
    "DELETE FROM materials WHERE id = $1 AND name = $2",
    [id, name]
  );
  return res.json({
    message: "Material deleted successfully",
    body: { material: { id, name } },
  });
};
