import { Request, Response } from "express";
import {
  findAllDescriptions,
  findDescriptionsById,
  editOrCreateDescription,
  eraseDescriptionById,
} from "../service/description.service";

export interface Description {
  id: number;
  description: string;
}

export const getAllDescriptions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const descriptions = await findAllDescriptions();
    return res.status(200).json(descriptions);
  } catch (e) {
    return res.status(500).json("Internal Server Error " + e);
  }
};

export const getDescriptionsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const descriptions = await findDescriptionsById(id);
  if (descriptions.length === 0) {
    return res.status(400).send("Description unavailable");
  }
  return res.status(200).json(descriptions[0].description);
};

export const editOrCreateDescriptions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, description } = req.body;
  const currentDesc = await findDescriptionsById(id);
  if (currentDesc.length === 0) {
    await editOrCreateDescription(id, description);
    return res
      .status(200)
      .json({ message: "Description created", data: { id, description } });
  } else {
    if (currentDesc[0].description === description) {
      return res
        .status(400)
        .json({
          message: "Description not changed",
          data: { id, description },
        });
    }
  }
  await editOrCreateDescription(id, description);
  return res
    .status(200)
    .json({ message: "Description updated", data: { id, description } });
};

export const eraseDescriptionsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const currentDesc = await findDescriptionsById(id);
  if (currentDesc.length === 0) {
    return res
      .status(400)
      .json("Description unavailable, nothing to erase");
  }
  await eraseDescriptionById(id);
  return res.status(200).json("Description erased");
};
