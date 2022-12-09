"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verficateUserServices = exports.loginUserService = exports.registerUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_schema_1 = __importDefault(require("../models/user.schema"));
const verificationCode_helper_1 = require("../helpers/verificationCode.helper");
const generate_jwt_helper_1 = require("../helpers/generate-jwt.helper");
const registerUserService = (authRegister) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield userRegister.save();
        return { email: userRegister.email, code: userRegister.verificationCode };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.registerUserService = registerUserService;
const loginUserService = (authLogin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findOne({ email: authLogin.email });
        const token = yield (0, generate_jwt_helper_1.generateJwt)(user.email);
        return { user: user.name, email: user.email, image: user.image, token };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.loginUserService = loginUserService;
const verficateUserServices = (verificateCode) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({ email: verificateCode.email });
    try {
        if ((user === null || user === void 0 ? void 0 : user.verificationCode) === verificateCode.code) {
            yield user.updateOne({ isActive: true });
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
});
exports.verficateUserServices = verficateUserServices;
//# sourceMappingURL=authUser.service.js.map