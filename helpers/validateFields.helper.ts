import { Joi, Segments } from "celebrate";

export const userRegisterValidator = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
  }),
};

export const userLoginValidator = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
  }),
};
