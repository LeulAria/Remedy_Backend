import { Schema } from "joi";

export const validatePayloadAsync = <T>({
  schema,
  payload,
}: {
  schema: Schema;
  payload: T;
}) => {
  return schema.validateAsync(payload);
};
