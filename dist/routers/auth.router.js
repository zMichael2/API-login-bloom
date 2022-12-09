"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const auth_controller_1 = require("../controllers/auth.controller");
const authUser_middleware_1 = require("../middleware/authUser.middleware");
const validateFields_helper_1 = require("../helpers/validateFields.helper");
const celebrateError_middleware_1 = require("../middleware/celebrateError.middleware");
const autheticationRouter = (0, express_1.Router)();
autheticationRouter.post("/register", [(0, celebrate_1.celebrate)(validateFields_helper_1.userRegisterValidator), authUser_middleware_1.validateUserExists], auth_controller_1.registerUser);
autheticationRouter.post("/login", [(0, celebrate_1.celebrate)(validateFields_helper_1.userLoginValidator), authUser_middleware_1.validatorUserData], auth_controller_1.loginUser);
autheticationRouter.get("/verification/:email/:code", auth_controller_1.verificateUser);
autheticationRouter.use(celebrateError_middleware_1.celebrateError);
exports.default = autheticationRouter;
//# sourceMappingURL=auth.router.js.map