import express from "express";
import config from "config";
import { ConfigParam } from "../config/default";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import fs from "fs";
import defaultCreateAdmin from "./utils/defaultCreateAdmin";
import { resolve } from "path";

const port = config.get<number>(ConfigParam.port);

if (process.argv.indexOf("--admin") !== -1) {
  defaultCreateAdmin();
}

const app = express();
app.use(express.json({ limit: "400mb" }));
app.use(deserializeUser);
app.use(`/statics`, express.static(resolve(__dirname, `../statics`)));

fs.mkdirSync(resolve(__dirname, `../statics`), { recursive: true });

app.listen(port, async function () {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
