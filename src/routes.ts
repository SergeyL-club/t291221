import { Express, Request, Response } from "express";
import { createUserHadler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get(`/healthcheck`, (req: Request, res: Response) => res.sendStatus(200));

  app.post(`/api/users`, validateResource(createUserSchema), createUserHadler);
}

export default routes;
