import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  CreateCategoryServiceInput,
  DeleteOneCategoryServiceInput,
} from "../schema/categoryService.schema";
import {
  createCategoryService,
  deleteOneCategoryService,
  findCategoryService,
} from "../service/categoryService.service";
import logger from "../utils/logger";

export async function createCategoryServiceHadler(
  req: Request<{}, {}, CreateCategoryServiceInput["body"]>,
  res: Response
) {
  try {
    const categoryService = await createCategoryService(req.body);
    return res.send(categoryService);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findCategroyServiceHandler(req: Request, res: Response) {
  return res.send(await findCategoryService({}));
}

export async function deleteOneCategoryServiceHandler(
  req: Request<{}, {}, DeleteOneCategoryServiceInput["body"]>,
  res: Response
) {
  try {
    const categoryService = await deleteOneCategoryService({
      _id: new mongoose.Types.ObjectId(req.body.id),
    });
    if (!categoryService)
      return res.status(400).send(`Category service undefined`);
    return res.send(categoryService);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
