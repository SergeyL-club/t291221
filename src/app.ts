import express from "express";
import config from "config";
import { ConfigParam } from "../config/default";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import defaultCreateAdmin from "./utils/defaultCreateAdmin";

const port = config.get<number>(ConfigParam.port);

if (process.argv.indexOf("--admin") !== -1) {
  defaultCreateAdmin();
}

const app = express();
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async function () {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
