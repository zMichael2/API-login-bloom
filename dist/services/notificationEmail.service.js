"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifiedEmail = exports.emailSendConfimed = void 0;
const axios_1 = __importDefault(require("axios"));
const emailSendConfimed = async (email, code) => {
    try {
        const authOptions = {
            method: "post",
            url: `${process.env.LINKEMAIL}/api/notification`,
            data: {
                email: email,
                code: code,
                type: "verificate",
            },
        };
        await (0, axios_1.default)(authOptions);
    }
    catch (error) {
        throw "Could not connect to mail service";
    }
};
exports.emailSendConfimed = emailSendConfimed;
const verifiedEmail = async (email) => {
    try {
        const authOptions = {
            method: "post",
            url: `${process.env.LINKEMAIL}/api/notification`,
            data: {
                email: email,
                type: "verificateConfirmed",
            },
        };
        await (0, axios_1.default)(authOptions);
    }
    catch (error) {
        throw "The confirmation email could not be sent correctly";
    }
};
exports.verifiedEmail = verifiedEmail;
//# sourceMappingURL=notificationEmail.service.js.map