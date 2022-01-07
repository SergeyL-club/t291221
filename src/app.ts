import express from "express";
import config from "config";
import { ConfigParam } from "../config/default";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get<number>(ConfigParam.port);

const app = express();
app.use(express.json());

app.listen(port, async function () {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
