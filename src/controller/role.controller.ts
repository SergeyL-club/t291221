import { Request, Response } from "express";
import { omit } from "lodash";
import {
  CreateRoleInput,
  deleteOneRoleInput,
  GetRoleInput,
} from "../schema/role.schema";
import { createRole, deleteOneRole, findRole } from "../service/role.service";
import checkAdmin from "../utils/checkAdmin";
import logger from "../utils/logger";
import mongoose from "mongoose";
import RoleModel from "../models/role.model";
import UserModel from "../models/user.model";

export async function createRoleHandler(
  req: Request<{}, {}, CreateRoleInput["body"]>,
  res: Response
) {
  try {
    if (req.body.name.trim() === "Client" || req.body.name.trim() === "Admin") {
      return res.status(409).send(`Admin or Client name reserved`);
    }

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

export async function deleteOneRoleHadler(
  req: Request<{}, {}, deleteOneRoleInput["body"]>,
  res: Response
) {
  try {
    const roleDef = await RoleModel.findOne({ funClient: true });

    let newRole;
    if (!roleDef) {
      newRole = await RoleModel.create({ name: "Client" });
    }

    const candidatesRole = await UserModel.find({
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
    return res.send(omit(role?.toJSON(), "__v"));
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}
