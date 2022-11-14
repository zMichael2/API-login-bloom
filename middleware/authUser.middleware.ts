import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.schema";

export const validateUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "the user already exists" });
  }
  next();
};

export const validatorUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      msg: "Username are not correct",
    });
  }

  if (!user.isActive) {
    return res.status(400).json({
      msg: "User is not active",
    });
  }
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "The password is not correct",
    });
  }
  next();
};
