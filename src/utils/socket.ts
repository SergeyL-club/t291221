import { Server, Socket } from "socket.io";
import { findOneUser, findUser } from "../service/user.service";
import logger from "./logger";

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
};

export default function ({ io }: { io: Server }) {
  logger.info(`Server io listen`);

  io.on(EVENTS.connection, async function (client: Socket) {
    client.emit("Connection apply");
    client.once("Auth aplly", (data: string) => {
      let name = data;
      findOneUser({ email: data }).then((doc) => {
        if (doc) {
          doc.isOnline = true;
          doc.save();
        }
      });
      client.join(name);
    });

    client.on(EVENTS.disconnect, () => {
      findUser({}).then((users) => {
        users.forEach((user) => {
          if (io.of("/").adapter.rooms.get(user.email)) {
            user.isOnline = true;
          } else {
            user.isOnline = false;
          }
          user.save();
        });
      });
      client.disconnect();
    });
  });
}
