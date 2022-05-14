import { Request, Response } from "express";
import {
  CreateRoleInput,
  deleteOneRoleInput,
  GetRoleInput,
} from "../schema/role.schema";
import {
  createRole,
  deleteOneRole,
  findOneRole,
  findRole,
} from "../service/role.service";
import checkAdmin from "../utils/checkAdmin";
import logger from "../utils/logger";
import mongoose from "mongoose";
import { findUser } from "../service/user.service";
import { omit } from "lodash";

export async function createRoleHandler(
  req: Request<{}, {}, CreateRoleInput["body"]>,
  res: Response
) {
  try {
    if (req.body.name.trim() === "Client" || req.body.name.trim() === "Admin") {
      return res.status(409).send(`Admin or Client name reserved`).end();
    }

    const role = await createRole(req.body);
    return res.status(200).send(role);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message).end();
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
    const role = await findOneRole({ _id: user.role });
    return res.status(200).send(omit(role?.toJSON(), "_id", "createdAt", "updatedAt", "__v")).end();
  } else {
    const roles = await findRole({});
    let omitRoles: any[] = [];
    roles.forEach(role => omitRoles.push(omit(role.toJSON(), "_id", "createdAt", "updatedAt", "__v")));
    return res.status(200).send(omitRoles).end();
  }
}

export async function deleteOneRoleHadler(
  req: Request<{}, {}, deleteOneRoleInput["body"]>,
  res: Response
) {
  try {
    const roleDef = await findOneRole({ funClient: true });

    let newRole;
    if (!roleDef) {
      newRole = await createRole({
        name: "Client",
        funClient: true,
        funAdmin: false,
      });
    }

    const candidatesRole = await findUser({
      role: new mongoose.Types.ObjectId(req.body.role),
    });

    if (candidatesRole.length > 0) {
      for (let i = 0; i < candidatesRole.length; i++) {
        let candidate = candidatesRole[i];
        if (roleDef) {
          candidate.role = roleDef._id;
          await candidate.save();
        } else if (newRole) {
          candidate.role = newRole._id;
          await candidate.save();
        }
      }
    }

    const role = await deleteOneRole({
      _id: new mongoose.Types.ObjectId(req.body.role),
    });
    return res.status(200).send(role).end();
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message).end();
  }
}
