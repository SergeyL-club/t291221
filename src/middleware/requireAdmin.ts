import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { findOneRole } from "../service/role.service";

const requireAdmin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  let role;
  if (
    !(role = await findOneRole({ _id: new Types.ObjectId(user.roleId) })) &&
    !(role = await findOneRole({ _id: new Types.ObjectId(user._doc.roleId) }))
  ) {
    return res.sendStatus(403);
  }

  if (!role || !role.funAdmin) {
    return res.sendStatus(403);
  }
  return next();
};

export default requireAdmin;
