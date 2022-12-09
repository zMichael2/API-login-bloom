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
exports.validatorUserData = exports.validateUserExists = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_schema_1 = __importDefault(require("../models/user.schema"));
const validateUserExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_schema_1.default.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "the user already exists" });
    }
    next();
});
exports.validateUserExists = validateUserExists;
const validatorUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_schema_1.default.findOne({ email });
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
});
exports.validatorUserData = validatorUserData;
//# sourceMappingURL=authUser.middleware.js.map