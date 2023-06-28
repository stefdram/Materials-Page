import { poolMaterial } from "../model";
import { QueryResult } from "pg";

interface Description {
  id: number;
  description: string;
}

const findAllDescriptions = async (): Promise<Description[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT id, description FROM descriptions"
  );
  return response.rows;
};

const findDescriptionsById = async (id: number): Promise<Description[]> => {
  const response: QueryResult = await poolMaterial.query(
    "SELECT description FROM descriptions WHERE id = $1",
    [id]
  );
  return response.rows;
};

const editOrCreateDescription = async (
  id: number,
  description: string
): Promise<Description[]> => {
  const response: QueryResult = await poolMaterial.query(
    "INSERT INTO descriptions (id, description) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET description = $2",
    [id, description]
  );
  return response.rows;
};

const eraseDescriptionById = async (id: number) => {
  await poolMaterial.query("DELETE FROM descriptions WHERE id = $1", [id]);
};

export {
  findAllDescriptions,
  findDescriptionsById,
  editOrCreateDescription,
  eraseDescriptionById,
};
