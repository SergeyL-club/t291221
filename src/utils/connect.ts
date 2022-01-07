import mongoose from "mongoose";
import config from "config";
import { ConfigParam } from "../../config/default";
import logger from "./logger";

async function connect() {
  const dbUrl = config.get<string>(ConfigParam.dbUrl);
  const dbName = config.get<string>(ConfigParam.dbName);

  try {
    await mongoose.connect(dbUrl);
    logger.info(`Connected to db ${dbName}`);
  } catch (e) {
    logger.error(`Could not connect to db ${dbName}`);
    process.exit(1);
  }
}

export default connect;
