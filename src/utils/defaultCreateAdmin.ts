import config from "config";
import logger from "./logger";
import { adminObj, ConfigParam } from "../../config/default";
import UserModel from "../models/user.model";
import connect from "./connect";
import RoleModel from "../models/role.model";

const admin = config.get<adminObj>(ConfigParam.adminObj);

async function defaultCreateAdmin() {
  connect();
  try {
    const role = await RoleModel.create({
      name: "Admin",
      funClient: false,
      funAdmin: true,
    });
    await UserModel.create({ ...admin, role: role._id });
    logger.info({ admin }, `Create admin`);
    process.exit(0);
  } catch (e: any) {
    logger.error(`${e.message}`);
    process.exit(1);
  }
}

export default defaultCreateAdmin;
