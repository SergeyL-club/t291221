import fs from "fs";
import { resolve } from "path";
import { deleteFolder } from "./deleteFolder";
import logger from "./logger";
import config from "config";
import { ConfigParam } from "../../config/default";

export enum StatusSave {
  product = "product",
  service = "service",
}

enum ImgDirectory {
  product = "imgsProducts",
  service = "imgsServices",
}

const previewCount = config.get<number>(ConfigParam.previewCount);

interface returnStatusOk {
  status: true;
  imgPreviewUrls: Array<string>;
  imgGalleryUrls: Array<string>;
}

interface returnStatusNoOk {
  status: false;
  error?: Error;
  imgErrors?: Array<{
    message: string;
    name: string;
    indexArray: number;
  }>;
}

interface imgProduct {
  name: string;
  desc: string;
  base64: string;
}

function saveImgs(
  nameDirectory: string,
  imgs: Array<imgProduct>,
  previewIndex: Array<number>,
  statusSave: string
): returnStatusOk | returnStatusNoOk {
  const directory =
    statusSave === StatusSave.product
      ? ImgDirectory.product
      : statusSave === StatusSave.service
      ? ImgDirectory.service
      : "default";

  if (!fs.existsSync(resolve(__dirname, `../../statics/${directory}`))) {
    fs.mkdirSync(resolve(__dirname, `../../statics/${directory}`));
  }

  try {
    fs.mkdirSync(
      resolve(__dirname, `../../statics/${directory}/${nameDirectory}`)
    );

    const imgPreviewUrls = [];
    const imgGalleryUrls = [];
    const imgErrors = [];

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      let buffer = img.base64;

      if (buffer.indexOf(";base64,") !== -1) {
        let baseBuf;
        if ((baseBuf = buffer.split(";base64,", 2).pop())) {
          buffer = baseBuf;
        }
      }
      try {
        fs.appendFileSync(
          resolve(
            __dirname,
            `../../statics/${directory}/${nameDirectory}/image${i}.png`
          ),
          buffer,
          { encoding: "base64" }
        );
        imgGalleryUrls.push(
          `/statics/${directory}/${nameDirectory}/image${i}.png`
        );

        if (previewIndex.indexOf(i) !== -1) {
          imgPreviewUrls.push(
            `/statics/${directory}/${nameDirectory}/image${i}`
          );
        }
      } catch (e: any) {
        imgErrors.push({
          message: "no save image",
          name: img.name,
          indexArray: i,
        });
      }
    }

    if (imgErrors.length > 0) {
      deleteFolder(
        resolve(__dirname, `../../statics/${directory}/${nameDirectory}`)
      );
      return {
        status: false,
        imgErrors,
      };
    }

    if (imgPreviewUrls.length < previewCount) {
      let uniqueUrls = [];
      outerloop: for (let i = 0; i < imgGalleryUrls.length; i++) {
        for (let j = 0; j < imgPreviewUrls.length; j++) {
          if (imgPreviewUrls[j] === imgGalleryUrls[i]) {
            continue outerloop;
          }
        }
        uniqueUrls.push(imgGalleryUrls[i]);
      }

      console.log(uniqueUrls.length, previewCount - imgPreviewUrls.length);

      if (uniqueUrls.length < previewCount - imgPreviewUrls.length) {
        deleteFolder(
          resolve(__dirname, `../../statics/${directory}/${nameDirectory}`)
        );
        return {
          status: false,
          error: new Error("imgPreviewUrls length lacks"),
        };
      }

      let iterLength = previewCount - imgPreviewUrls.length;

      for (let i = 0; i < iterLength; i++) {
        let url = uniqueUrls.shift();
        if (url) {
          imgPreviewUrls.push(url);
        }
      }
    }

    return {
      status: true,
      imgPreviewUrls,
      imgGalleryUrls,
    };
  } catch (e: any) {
    deleteFolder(
      resolve(__dirname, `../../statics/${directory}/${nameDirectory}`)
    );
    logger.error(e);
    return {
      status: false,
      error: e,
    };
  }
}

export default saveImgs;
