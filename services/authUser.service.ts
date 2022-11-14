import bcryptjs from "bcryptjs";
import { authRegister } from "../interface/authUser.interface";
import User from "../models/user.schema";
import { generateVerificationCode } from "../helpers/VerificationCode.helper";

export const registerUserService = async (
  authRegister: authRegister
): Promise<string | null> => {
  try {
    const salt = bcryptjs.genSaltSync(5);
    const password = bcryptjs.hashSync(authRegister.password, salt);

    const userRegister = new User({
      name: authRegister.name,
      email: authRegister.email,
      password: password,
      verificationCode: generateVerificationCode(),
    });

    await userRegister.save();
    return `The user ${authRegister.name} has been successfully registered`;
  } catch (error) {
    console.log(error);
    return null;
  }
};
