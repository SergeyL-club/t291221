import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteOneProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteOneProduct,
  findProduct,
} from "../service/product.service";
import logger from "../utils/logger";
import { Types } from "mongoose";
import { findOneCategoryProduct } from "../service/categoryProduct.service";
import { resolve } from "path";
import { deleteFolder } from "../utils/deleteFolder";
import saveImgs, { StatusSave } from "../utils/saveImgs";

export async function createProductHadler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const candidateCategory = await findOneCategoryProduct({
      _id: new Types.ObjectId(req.body.categoryId),
    });

    if (!candidateCategory)
      return res.status(400).send(`No category candidate`);

    const saveImgsProduct = saveImgs(
      req.body.name,
      req.body.imgs,
      req.body.previewIndex,
      StatusSave.product
    );

    if (saveImgsProduct.status === false) {
      if (saveImgsProduct.error) {
        return res.status(409).send(saveImgsProduct.error.message);
      } else if (saveImgsProduct.imgErrors) {
        return res
          .status(409)
          .send(`Error save img, length ${saveImgsProduct.imgErrors.length}`);
      }
      return res.status(409).send(`Error global save img`);
    }

    // create product
    const newProduct = await createProduct({
      name: req.body.name,
      categoryId: candidateCategory._id,
      abDesc: req.body.abDesc,
      desc: req.body.desc,
      prices: req.body.prices,
      imgPreviewUrls: saveImgsProduct.imgPreviewUrls,
      imgGalleryUrls: saveImgsProduct.imgGalleryUrls,
    });

    // return result
    return res.status(200).json({
      ...newProduct,
    });
  } catch (e: any) {
    // errors
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findProductHandler(req: Request, res: Response) {
  return res.send(await findProduct({}));
}

export async function deleteOneProductHandler(
  req: Request<{}, {}, DeleteOneProductInput["body"]>,
  res: Response
) {
  try {
    const product = await deleteOneProduct({
      _id: new Types.ObjectId(req.body.id),
    });

    if (!product) return res.status(400).send(`Product undefined`);

    // delete product directory
    let deleteDirectoryImgs = false;
    if (product) {
      deleteDirectoryImgs = deleteFolder(
        resolve(__dirname, `../../statics/imgProducts/${product.name}`)
      );
    }

    // return deleteEl
    return res.status(200).json({
      ...product,
      deleteDirectoryImgs,
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
