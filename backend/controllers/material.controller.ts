import { Request, Response } from "express";
import { poolMaterial } from "../model";
import { QueryResult } from "pg";

export interface Material {
  id: number;
  name: string;
  user_nik: number;
  date_added: Date;
}

export const test = () => {
  console.log("test");
}
