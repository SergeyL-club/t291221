import { Request, Response } from "express";
import { omit } from "lodash";
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
import saveImg, { StatusSaveOne } from "../utils/saveImg";
import { resolve } from "path";
import fs from "fs";

export async function createCategoryServiceHadler(
  req: Request<{}, {}, CreateCategoryServiceInput["body"]>,
  res: Response
) {
  try {
    const img = saveImg(
      req.body.name,
      req.body.previewImg,
      StatusSaveOne.categoryServices
    );

    if (img.status === false) {
      return res.status(409).send(img.error.message);
    }

    const categoryService = await createCategoryService({
      ...omit(req.body, "previewImg"),
      imgUrl: img.url,
    });
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
    if (categoryService) {
      fs.unlinkSync(
        resolve(
          __dirname,
          `../../statics/categoryServices/${categoryService.name}.png`
        )
      );
    }
    if (!categoryService)
      return res.status(400).send(`Category service undefined`);
    return res.send(categoryService);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
