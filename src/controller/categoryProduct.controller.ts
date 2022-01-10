import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  CreateCategoryProductInput,
  DeleteOneCategoryProductInput,
} from "../schema/categoryProduct.schema";
import {
  createCategoryProduct,
  findCategoryProduct,
  deleteOneCategoryProduct,
} from "../service/categoryProduct.service";
import logger from "../utils/logger";

export async function createCategoryProductHadler(
  req: Request<{}, {}, CreateCategoryProductInput["body"]>,
  res: Response
) {
  try {
    const categoryProduct = await createCategoryProduct(req.body);
    return res.send(categoryProduct);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findCategroyProductHandler(req: Request, res: Response) {
  return res.send(await findCategoryProduct({}));
}

export async function deleteOneCategoryProductHandler(
  req: Request<{}, {}, DeleteOneCategoryProductInput["body"]>,
  res: Response
) {
  try {
    const categoryProduct = await deleteOneCategoryProduct({
      _id: new mongoose.Types.ObjectId(req.body.id),
    });
    return res.send(categoryProduct);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
