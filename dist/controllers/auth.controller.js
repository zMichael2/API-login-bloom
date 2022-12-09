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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificateUser = exports.loginUser = exports.registerUser = void 0;
const authUser_service_1 = require("../services/authUser.service");
const notificationEmail_service_1 = require("../services/notificationEmail.service");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, image, rol } = req.body;
    const response = yield (0, authUser_service_1.registerUserService)({
        name,
        email,
        password,
        image,
        rol,
    });
    if (!response) {
        return res
            .status(400)
            .json({ message: "The user could not be registered." });
    }
    try {
        yield (0, notificationEmail_service_1.emailSendConfimed)(response.email, response.code);
    }
    catch (error) {
        return res.status(400).json(error);
    }
    return res
        .status(200)
        .json({ mesagge: `The user ${name} has been successfully registered` });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const response = yield (0, authUser_service_1.loginUserService)({ email, password });
    if (!response) {
        return res.status(400).json({ message: "failed to login" });
    }
    return res.status(200).json({ data: response });
});
exports.loginUser = loginUser;
const verificateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, email } = req.params;
    const response = yield (0, authUser_service_1.verficateUserServices)({ code, email });
    if (!response) {
        return res
            .status(400)
            .json({ message: "verification code does not match" });
    }
    try {
        yield (0, notificationEmail_service_1.verifiedEmail)(email);
    }
    catch (error) {
        return res.status(400).json(error);
    }
    return res.status(200).json();
});
exports.verificateUser = verificateUser;
//# sourceMappingURL=auth.controller.js.map