import logger from "./logger";
import fs from "fs";
import { resolve } from "path";

export enum StatusSaveOne {
  categoryProducts = "categoryProducts",
  categoryServices = "categoryServices",
}

interface returnStatusOk {
  status: true;
  url: string;
}

interface returnStatusNoOk {
  status: false;
  error: Error;
}

function saveImg(
  name: string,
  base64: string,
  status: string
): returnStatusOk | returnStatusNoOk {
  const directory =
    status === StatusSaveOne.categoryProducts
      ? StatusSaveOne.categoryProducts
      : status === StatusSaveOne.categoryServices
      ? StatusSaveOne.categoryServices
      : "default";

  if (!fs.existsSync(resolve(__dirname, `../../statics/${directory}`))) {
    fs.mkdirSync(resolve(__dirname, `../../statics/${directory}`));
  }

  if (base64.indexOf(";base64,") !== -1) {
    let baseBuf;
    if ((baseBuf = base64.split(";base64,", 2).pop())) {
      base64 = baseBuf;
    }
  }

  try {
    fs.appendFileSync(
      resolve(__dirname, `../../statics/${directory}/${name}.png`),
      base64,
      { encoding: "base64" }
    );
    const url = `/statics/${directory}/${name}.png`;

    return {
      status: true,
      url,
    };
  } catch (e: any) {
    logger.error(e);
    return {
      status: false,
      error: e,
    };
  }
}

export default saveImg;
