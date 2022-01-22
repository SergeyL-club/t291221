import { Request, Response } from "express";
import { CreateServiceInput } from "../schema/service.schema";
import { findOneCategoryService } from "../service/categoryService.service";
import { Types } from "mongoose";
import saveImgs, { StatusSave } from "../utils/saveImgs";
import { createService } from "../service/service.service";
import { findUser } from "../service/user.service";
import logger from "../utils/logger";

enum DayName {
  sunday = "Sunday",
  monday = "Monday",
  tuesday = "Tuesday",
  wednesday = "Wednesday",
  thursday = "Thursday",
  friday = "Friday",
  saturday = "Saturday",
}

export async function createServiceHadler(
  req: Request<{}, {}, CreateServiceInput["body"]>,
  res: Response
) {
  try {
    const candidateCategory = await findOneCategoryService({
      _id: new Types.ObjectId(req.body.categoryId),
    });

    if (!candidateCategory)
      return res.status(400).send(`No category candidate`);

    const saveImgsProduct = saveImgs(
      req.body.name,
      req.body.imgs,
      req.body.previewIndex,
      StatusSave.service
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

    const executors = [];
    const executorsUndefined = [];
    for (let i = 0; i < req.body.executors.length; i++) {
      const candidate = req.body.executors[i];
      if (await findUser({ _id: new Types.ObjectId(candidate) })) {
        executors.push(new Types.ObjectId(candidate));
      } else {
        executorsUndefined.push(new Types.ObjectId(candidate));
      }
    }

    // create product
    const newProduct = await createService({
      name: req.body.name,
      categoryId: candidateCategory._id,
      abDesc: req.body.abDesc,
      desc: req.body.desc,
      prices: req.body.prices,
      imgPreviewUrls: saveImgsProduct.imgPreviewUrls,
      imgGalleryUrls: saveImgsProduct.imgGalleryUrls,
      executors,
      schedules: req.body.schedules,
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
