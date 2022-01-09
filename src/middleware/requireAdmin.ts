import { Request, Response, NextFunction } from "express";
import RoleModel from "../models/role.model";

const requireAdmin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  const role = await RoleModel.findOne({ _id: user.roleId });

  if (!role || !role.funAdmin) {
    return res.sendStatus(403);
  }
  return next();
};

export default requireAdmin;
