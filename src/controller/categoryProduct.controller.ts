import { Request, Response } from "express";
import { omit } from "lodash";
import mongoose from "mongoose";
import { resolve } from "path";
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
import saveImg, { StatusSaveOne } from "../utils/saveImg";
import fs from "fs";

export async function createCategoryProductHadler(
  req: Request<{}, {}, CreateCategoryProductInput["body"]>,
  res: Response
) {
  try {
    const img = saveImg(
      req.body.name,
      req.body.previewImg,
      StatusSaveOne.categoryProducts
    );

    if (img.status === false) {
      return res.status(409).send(img.error.message);
    }

    const categoryProduct = await createCategoryProduct({
      ...omit(req.body, "previewImg"),
      imgUrl: img.url,
    });
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
    if (categoryProduct) {
      fs.unlinkSync(
        resolve(
          __dirname,
          `../../statics/${StatusSaveOne.categoryProducts}/${categoryProduct.name}.png`
        )
      );
    }

    if (!categoryProduct)
      return res.status(400).send(`Category product undefined`);
    return res.send(categoryProduct);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
