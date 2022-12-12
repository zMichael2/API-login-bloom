"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorUserData = exports.validateUserExists = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_schema_1 = __importDefault(require("../models/user.schema"));
const validateUserExists = async (req, res, next) => {
    const { email } = req.body;
    const user = await user_schema_1.default.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "the user already exists" });
    }
    next();
};
exports.validateUserExists = validateUserExists;
const validatorUserData = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_schema_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({
            msg: "Username are not correct",
        });
    }
    if (!user.isActive) {
        return res.status(400).json({
            msg: "User is not active",
        });
    }
    const validPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: "The password is not correct",
        });
    }
    next();
};
exports.validatorUserData = validatorUserData;
//# sourceMappingURL=authUser.middleware.js.map