"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidator = exports.userRegisterValidator = void 0;
const celebrate_1 = require("celebrate");
exports.userRegisterValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        name: celebrate_1.Joi.string().min(6).required(),
        email: celebrate_1.Joi.string().email().required(),
        image: celebrate_1.Joi.string(),
        rol: celebrate_1.Joi.string(),
        password: celebrate_1.Joi.string().min(4).max(20).required(),
    }),
};
exports.userLoginValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(4).max(20).required(),
    }),
};
//# sourceMappingURL=validateFields.helper.js.map