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
import mongoose from "mongoose";
import { findOneCategoryProduct } from "../service/categoryProduct.service";
import fs from "fs";
import { resolve } from "path";
import { deleteFolder } from "../utils/deleteFolder";

export async function createProductHadler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const candidateCategory = await findOneCategoryProduct({
      _id: new mongoose.Types.ObjectId(req.body.categoryId),
    });

    if (!candidateCategory)
      return res.status(400).send(`No category candidate`);

    // files array result
    const imgErrors: Array<any> = [];
    const imgPreview: Array<string> = [];
    const imgGallery: Array<string> = [];

    if (req.body.imgs.length > 0) {
      // create directory product
      fs.mkdirSync(
        resolve(__dirname, `../../statics/imgProducts/${req.body.name}`),
        {
          recursive: true,
        }
      );
    }

    // save files
    req.body.imgs.map((image, index) => {
      let buffer = image.base64;

      if (buffer.indexOf(";base64,") !== -1) {
        let baseBuf;
        if ((baseBuf = buffer.split(";base64,", 2).pop())) {
          buffer = baseBuf;
        }
      }

      try {
        // save all files in gallery
        fs.appendFileSync(
          resolve(
            __dirname,
            `../../statics/imgProducts/${req.body.name}/image${index}.png`
          ),
          buffer,
          { encoding: "base64" }
        );
        imgGallery.push(
          `/statics/imgProducts/${req.body.name}/image${index}.png`
        );

        // save url preview
        if (req.body.previewIndex.indexOf(index) !== -1) {
          imgPreview.push(
            `/statics/imgProducts/${req.body.name}/image${index}`
          );
        }
      } catch (e) {
        console.log(e);

        // error save
        imgErrors.push({
          message: "no save image",
          name: image.name,
          indexArray: index,
        });
      }
    });

    // add deficient
    if (imgPreview.length < 4) {
      let getImgs = imgGallery.filter((imgUrlGallery) => {
        let check = true;
        imgPreview.map((imgUrlPreview) => {
          if (imgUrlGallery === imgUrlPreview) check = false;
        });
        return check;
      });

      // check length getImgs
      if (getImgs.length >= 4 - imgPreview.length) {
        const forIndex = 4 - imgPreview.length;
        for (let i = 0; i < forIndex; i++) {
          let el = getImgs.shift();
          if (el) {
            imgPreview.push(el);
          }
        }
      } else {
        return res
          .status(409)
          .send(`No normal lenght gallery img and/or lenght preview img`);
      }
    }

    // create product
    const newProduct = await createProduct({
      name: req.body.name,
      categoryId: candidateCategory._id,
      abDesc: req.body.abDesc,
      desc: req.body.desc,
      prices: req.body.prices,
      imgPreviewUrls: imgPreview,
      imgGalleryUrls: imgGallery,
    });

    // return result
    return res.status(200).json({
      ...newProduct,
      imgErrors,
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
      _id: new mongoose.Types.ObjectId(req.body.id),
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
