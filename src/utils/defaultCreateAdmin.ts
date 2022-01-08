import config from "config";
import logger from "./logger";
import { adminObj, ConfigParam } from "../../config/default";
import UserModel from "../models/user.model";
import connect from "./connect";

const admin = config.get<adminObj>(ConfigParam.adminObj);

async function defaultCreateAdmin() {
  connect();
  try {
    await UserModel.create({ ...admin });
    logger.info({ admin }, `Create admin`);
    process.exit(1);
  } catch (e: any) {
    logger.error(`${e.message}`);
    process.exit(1);
  }
}

export default defaultCreateAdmin;
