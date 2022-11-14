import { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
  verficateUserServices,
} from "../services/authUser.service";
import {
  emailSendConfimed,
  verifiedEmail,
} from "../services/notificationEmail.service";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const response = await registerUserService({ name, email, password });
  await emailSendConfimed(response!.email, response!.code);
  //funcionQueVanEnviarLosDatosAlMicroServicio(response.email,response.code)

  if (!response) {
    return res
      .status(400)
      .json({ message: "The user could not be registered." });
  }
  return res
    .status(200)
    .json({ mesagge: `The user ${name} has been successfully registered` });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await loginUserService({ email, password });
  if (!response) {
    return res.status(400).json({ message: "failed to login" });
  }
  return res.status(200).json({ data: response });
};

export const verificateUser = async (req: Request, res: Response) => {
  const { code, email } = req.params;
  const response = await verficateUserServices({ code, email });
  if (!response) {
    return res
      .status(400)
      .json({ message: "verification code does not match" });
  }
  await verifiedEmail(email);
  return res.status(200).json();
};
