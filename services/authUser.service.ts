import bcryptjs from "bcryptjs";
import User from "../models/user.schema";
import { authLogin, authRegister } from "../interface/authUser.interface";
import { generateVerificationCode } from "../helpers/verificationCode.helper";
import { generateJwt } from "../helpers/generate-jwt.helper";

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

export const loginUserService = async (authLogin: authLogin) => {
  try {
    const user = await User.findOne({ email: authLogin.email });
    const token = await generateJwt(user!.email);
    return { user: user!.name, email: user!.email, token };
  } catch (error) {
    console.log(error);
    return null;
  }
};
