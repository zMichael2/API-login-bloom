import bcryptjs from "bcryptjs";
import User from "../models/user.schema";
import {
  authLogin,
  authRegister,
  verificateCode,
} from "../interface/authUser.interface";
import { generateVerificationCode } from "../helpers/verificationCode.helper";
import { generateJwt } from "../helpers/generate-jwt.helper";

export const registerUserService = async (authRegister: authRegister) => {
  try {
    const salt = bcryptjs.genSaltSync(5);
    const password = bcryptjs.hashSync(authRegister.password, salt);

    const userRegister = new User({
      name: authRegister.name,
      email: authRegister.email,
      password: password,
      image: authRegister.image,
      rol: authRegister.rol,
      verificationCode: generateVerificationCode(),
    });

    await userRegister.save();
    return { email: userRegister.email, code: userRegister.verificationCode };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginUserService = async (authLogin: authLogin) => {
  try {
    const user = await User.findOne({ email: authLogin.email });
    const token = await generateJwt(user!.email);
    return { user: user!.name, email: user!.email, image: user!.image, token };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verficateUserServices = async (
  verificateCode: verificateCode
): Promise<string | null> => {
  const user = await User.findOne({ email: verificateCode.email });
  try {
    if (user?.verificationCode === verificateCode.code) {
      await user.updateOne({ isActive: true });
      return `successfully verified`;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
