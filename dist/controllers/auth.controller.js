"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificateUser = exports.loginUser = exports.registerUser = void 0;
const authUser_service_1 = require("../services/authUser.service");
const notificationEmail_service_1 = require("../services/notificationEmail.service");
const registerUser = async (req, res) => {
    const { name, email, password, image, rol } = req.body;
    const response = await (0, authUser_service_1.registerUserService)({
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
        await (0, notificationEmail_service_1.emailSendConfimed)(response.email, response.code);
    }
    catch (error) {
        return res.status(400).json(error);
    }
    return res
        .status(200)
        .json({ mesagge: `The user ${name} has been successfully registered` });
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const response = await (0, authUser_service_1.loginUserService)({ email, password });
    if (!response) {
        return res.status(400).json({ message: "failed to login" });
    }
    return res.status(200).json({ data: response });
};
exports.loginUser = loginUser;
const verificateUser = async (req, res) => {
    const { code, email } = req.params;
    const response = await (0, authUser_service_1.verficateUserServices)({ code, email });
    if (!response) {
        return res
            .status(400)
            .json({ message: "verification code does not match" });
    }
    try {
        await (0, notificationEmail_service_1.verifiedEmail)(email);
    }
    catch (error) {
        return res.status(400).json(error);
    }
    return res.status(200).json();
};
exports.verificateUser = verificateUser;
//# sourceMappingURL=auth.controller.js.map