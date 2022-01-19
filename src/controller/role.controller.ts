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

export async function createRoleHandler(
  req: Request<{}, {}, CreateRoleInput["body"]>,
  res: Response
) {
  try {
    if (req.body.name.trim() === "Client" || req.body.name.trim() === "Admin") {
      return res.status(409).send(`Admin or Client name reserved`);
    }

    const role = await createRole(req.body);
    return res.send(role);
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

  const isAdmin = await checkAdmin(user._doc._id);

  if (!req.body.isMain && !isAdmin) return res.sendStatus(403);

  if (req.body.isMain) {
    return res.send(await findRole({ _id: user.roleId }));
  } else {
    return res.send(await findRole({}));
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
      roleId: new mongoose.Types.ObjectId(req.body.roleId),
    });

    if (candidatesRole.length > 0) {
      for (let i = 0; i < candidatesRole.length; i++) {
        let candidate = candidatesRole[i];
        if (roleDef) {
          candidate.roleId = roleDef._id;
          await candidate.save();
        } else if (newRole) {
          candidate.roleId = newRole._id;
          await candidate.save();
        }
      }
    }

    const role = await deleteOneRole({
      _id: new mongoose.Types.ObjectId(req.body.roleId),
    });
    if (!role) return res.status(400).send(`Role undefined`);
    return res.send(role);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}
