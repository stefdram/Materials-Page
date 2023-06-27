import { poolMaterial } from "../model";
import { QueryResult } from "pg";

interface Material {
  material_id: number;
  id: number;
  name: string;
  user_nik: number;
  date_added: Date;
}

const findAllMaterials = async (): Promise<Material[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT id, name, user_nik, to_char(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added FROM materials"
  );
  return response.rows;
};

const findMaterialsById = async (id: number): Promise<Material[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT id, name, user_nik, to_char(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added FROM materials WHERE id = $1",
    [id]
  );
  return response.rows;
};

const findMaterialsByName = async (name: string): Promise<Material[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT id, name, user_nik, to_char(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added FROM materials WHERE name = $1",
    [name]
  );
  return response.rows;
};

const findAllIds = async (): Promise<number[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT DISTINCT id FROM materials"
  );
  return response.rows.map((row) => row.id);
};

const setCurrentJakartaTime = () => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
  const date_added = currentDate.toISOString();
  return date_added;
};

const findMaterialByIdAndName = async (
  id: number,
  name: string
): Promise<Material[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT * FROM materials WHERE id = $1 AND name = $2",
    [id, name]
  );
  return response.rows;
};

const createNewMaterial = async (
  id: number,
  name: string,
  user_nik: number,
  date_added: string
): Promise<Material[]> => {
  const response: QueryResult = await poolMaterial.query(
    "INSERT INTO materials (id, name, user_nik, date_added) VALUES ($1, $2, $3, $4)",
    [id, name, user_nik, date_added]
  );
  return response.rows;
};

const editMaterial = async (newName: string, name: string, id: Number) => {
  await poolMaterial.query(
    "UPDATE materials SET name = $1 WHERE name = $2 AND id = $3",
    [newName, name, id]
  );
};

const eraseMaterialsById = async (id: number) => {
  await poolMaterial.query("DELETE FROM materials WHERE id = $1", [id]);
};

const eraseMaterialByIdAndName = async (id: number, name: string) => {
  await poolMaterial.query(
    "DELETE FROM materials WHERE id = $1 AND name = $2",
    [id, name]
  );
};

export {
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
};