import { Request, Response, NextFunction } from "express";
import SessionModel from "../models/session.model";

const requireSession = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  if (!user) return res.sendStatus(403);
  const session = await SessionModel.findOne({ _id: user.session });

  if (!session || !session.valid) return res.sendStatus(403);

  return next();
};

export default requireSession;
