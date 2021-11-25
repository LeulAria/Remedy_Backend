import { IPostUpdatePayload } from "./../../typeDefs/posts";
import Joi from "joi";
import { IPostPayload } from "../../typeDefs/posts";

export const validatePostPayloadInput = (payload: IPostPayload) => {
  const schema = Joi.object({
    body: Joi.string().required(),
  });

  return { schema, payload };
};

export const validatePostUpdatePayloadInput = (payload: IPostUpdatePayload) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
    body: Joi.string().required(),
  });

  return { schema, payload };
};
