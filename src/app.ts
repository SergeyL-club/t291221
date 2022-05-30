import express from "express";
import config from "config";
import { ConfigParam } from "../config/default";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import defaultCreateAdmin from "./utils/defaultCreateAdmin";
import { Server } from "socket.io";
import { createServer } from "http";
import socket from "./utils/socket";
import cors from "cors";

const port = config.get<number>(ConfigParam.port);

if (process.argv.indexOf("--admin") !== -1) {
  defaultCreateAdmin();
}

const app = express();
app.use(express.json());
app.use(deserializeUser);
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  transports: ["websocket"],
});

httpServer.listen(port, async function () {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
  socket({ io });
});
