import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { validateUserExists } from "../middleware/authUser.middleware";

const autheticationRouter = Router();

autheticationRouter.post("/register", [validateUserExists], registerUser);
autheticationRouter.post("/login");

export default autheticationRouter;
