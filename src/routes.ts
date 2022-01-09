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
import antiRequireUser from "./middleware/antiRequireUser";
import requireAdmin from "./middleware/requireAdmin";
import requireSession from "./middleware/requireSession";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createRoleSchema, getRoleSchema } from "./schema/role.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  // user
  app.post(
    `/api/users`,
    antiRequireUser,
    validateResource(createUserSchema),
    createUserHadler
  );

  // session
  app.post(
    `/api/sessions`,
    validateResource(createSessionSchema),
    createSessionHandler
  );

  app.get("/api/sessions", requireUser, requireSession, getUserSessionsHandler);

  app.delete(
    "/api/sessions",
    requireUser,
    requireSession,
    deleteSessionHandler
  );

  // role
  app.post(
    `/api/roles`,
    requireUser,
    requireSession,
    requireAdmin,
    validateResource(createRoleSchema),
    createRoleHandler
  );

  app.get(
    `/api/roles`,
    requireUser,
    requireSession,
    validateResource(getRoleSchema),
    getRoleHandler
  );
}

export default routes;
