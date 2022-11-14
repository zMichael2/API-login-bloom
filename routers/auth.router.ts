import { Router } from "express";
import { celebrate } from "celebrate";
import { loginUser, registerUser } from "../controllers/auth.controller";
import {
  validateUserExists,
  validatorUserData,
} from "../middleware/authUser.middleware";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../helpers/validateFields.helper";
import { celebrateError } from "../middleware/celebrateError.middleware";

const autheticationRouter = Router();

autheticationRouter.post(
  "/register",
  [celebrate(userRegisterValidator), validateUserExists],
  registerUser
);
autheticationRouter.post(
  "/login",
  [celebrate(userLoginValidator), validatorUserData],
  loginUser
);
autheticationRouter.use(celebrateError);

export default autheticationRouter;
