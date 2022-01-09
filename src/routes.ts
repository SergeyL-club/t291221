import { Express } from "express";
import {
  createRoleHandler,
  getRoleHandler,
} from "./controller/role.controller";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHadler } from "./controller/user.controller";
import requireAdmin from "./middleware/requireAdmin";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createRoleSchema } from "./schema/role.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  // user
  app.post(`/api/users`, validateResource(createUserSchema), createUserHadler);

  // session
  app.post(
    `/api/sessions`,
    validateResource(createSessionSchema),
    createSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // role
  app.post(
    `/api/roles`,
    requireUser,
    requireAdmin,
    validateResource(createRoleSchema),
    createRoleHandler
  );

  app.get(`/api/roles`, requireUser, requireAdmin, getRoleHandler);
}

export default routes;
