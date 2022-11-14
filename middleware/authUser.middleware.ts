import { Request, Response, NextFunction } from "express";

import User from "../models/user.schema";
export const validateUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({
    name: name,
    email: email,
  });
  if (user) {
    return res
      .status(400)
      .json({ message: "Could not register because the user already exists" });
  }
  next();
};
