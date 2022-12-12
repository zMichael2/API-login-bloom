"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verficateUserServices = exports.loginUserService = exports.registerUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_schema_1 = __importDefault(require("../models/user.schema"));
const verificationCode_helper_1 = require("../helpers/verificationCode.helper");
const generate_jwt_helper_1 = require("../helpers/generate-jwt.helper");
const registerUserService = async (authRegister) => {
    try {
        const salt = bcryptjs_1.default.genSaltSync(5);
        const password = bcryptjs_1.default.hashSync(authRegister.password, salt);
        const userRegister = new user_schema_1.default({
            name: authRegister.name,
            email: authRegister.email,
            password: password,
            image: authRegister.image,
            rol: authRegister.rol,
            verificationCode: (0, verificationCode_helper_1.generateVerificationCode)(),
        });
        await userRegister.save();
        return { email: userRegister.email, code: userRegister.verificationCode };
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.registerUserService = registerUserService;
const loginUserService = async (authLogin) => {
    try {
        const user = await user_schema_1.default.findOne({ email: authLogin.email });
        const token = await (0, generate_jwt_helper_1.generateJwt)(user.email);
        return { user: user.name, email: user.email, image: user.image, token };
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.loginUserService = loginUserService;
const verficateUserServices = async (verificateCode) => {
    const user = await user_schema_1.default.findOne({ email: verificateCode.email });
    try {
        if ((user === null || user === void 0 ? void 0 : user.verificationCode) === verificateCode.code) {
            await user.updateOne({ isActive: true });
            return `successfully verified`;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.verficateUserServices = verficateUserServices;
//# sourceMappingURL=authUser.service.js.map