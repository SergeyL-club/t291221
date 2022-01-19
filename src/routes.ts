import { Express } from "express";
import {
  createCategoryProductHadler,
  deleteOneCategoryProductHandler,
  findCategroyProductHandler,
} from "./controller/categoryProduct.controller";
import {
  createCategoryServiceHadler,
  deleteOneCategoryServiceHandler,
  findCategroyServiceHandler,
} from "./controller/categoryService.controller";
import {
  createProductHadler,
  deleteOneProductHandler,
  findProductHandler,
} from "./controller/product.controller";
import {
  createRoleHandler,
  deleteOneRoleHadler,
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
import { createCategoryProductSchema } from "./schema/categoryProduct.schema";
import { createCategoryServiceSchema } from "./schema/categoryService.schema";
import {
  createProductSchema,
  deleteOneProductSchema,
} from "./schema/product.schema";
import {
  createRoleSchema,
  deleteOneRoleSchema,
  getRoleSchema,
} from "./schema/role.schema";
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

  app.delete(
    `/api/roles`,
    requireUser,
    requireSession,
    requireAdmin,
    validateResource(deleteOneRoleSchema),
    deleteOneRoleHadler
  );

  // category product
  app.post(
    `/api/categoryProducts`,
    requireUser,
    requireSession,
    requireAdmin,
    validateResource(createCategoryProductSchema),
    createCategoryProductHadler
  );

  app.get(
    `/api/categoryProducts`,
    requireUser,
    requireSession,
    findCategroyProductHandler
  );

  app.delete(
    `/api/categoryProducts`,
    requireUser,
    requireSession,
    requireAdmin,
    deleteOneCategoryProductHandler
  );

  // product
  app.post(
    `/api/products`,
    requireUser,
    requireSession,
    requireAdmin,
    validateResource(createProductSchema),
    createProductHadler
  );
  app.delete(
    `/api/products`,
    requireUser,
    requireSession,
    requireAdmin,
    validateResource(deleteOneProductSchema),
    deleteOneProductHandler
  );
  app.get(`/api/products`, requireUser, requireSession, findProductHandler);

  // category product
  app.post(
    `/api/categoryServices`,
    requireUser,
    requireSession,
    requireAdmin,
    validateResource(createCategoryServiceSchema),
    createCategoryServiceHadler
  );

  app.get(
    `/api/categoryServices`,
    requireUser,
    requireSession,
    findCategroyServiceHandler
  );

  app.delete(
    `/api/categoryServices`,
    requireUser,
    requireSession,
    requireAdmin,
    deleteOneCategoryServiceHandler
  );
}

export default routes;
