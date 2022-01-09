import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateRoleInput } from "../schema/role.schema";
import { createRole } from "../service/role.service";
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
