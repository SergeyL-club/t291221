import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateRoleInput, GetRoleInput } from "../schema/role.schema";
import { createRole, findRole } from "../service/role.service";
import checkAdmin from "../utils/checkAdmin";
import logger from "../utils/logger";

export async function createRoleHandler(
  req: Request<{}, {}, CreateRoleInput["body"]>,
  res: Response
) {
  try {
    const role = await createRole(req.body);
    return res.send(omit(role.toJSON(), "__v"));
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function getRoleHandler(
  req: Request<{}, {}, GetRoleInput["body"]>,
  res: Response
) {
  const user = res.locals.user;

  const isAdmin = await checkAdmin(user._id);

  if (!req.body.isMain && !isAdmin) return res.sendStatus(403);

  if (req.body.isMain) {
    return res.send(await findRole({ _id: user.roleId }));
  } else {
    return res.send(await findRole({}));
  }
}
