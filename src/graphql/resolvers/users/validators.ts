import Joi from "joi";
import { IUserLoginPayload, IUserRegisterPayload } from "../../typeDefs/users";

export const validateRegisterUserInput = (payload: IUserRegisterPayload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(2).required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).valid(Joi.ref("password")),
  });

  return schema.validateAsync(payload);
};

export const validateLoginUserInput = (payload: IUserLoginPayload) => {
  const schema = Joi.object({
    username: Joi.string().min(2),
    email: Joi.string().email(),
    password: Joi.string().min(5).required()
  });

  return schema.validateAsync(payload);
}