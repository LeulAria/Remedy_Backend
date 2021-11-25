import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env";
import { IUserModel } from "../models/user/types";

export const ROUTE_GUARD = {
  checkIfLoggedIn: (context: any): IUserModel => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          return user as IUserModel;
        } catch (err) {
          throw new AuthenticationError("Invalid/Expired token.");
        }
      } else {
        throw new Error("Authorization token must be 'Bearer ...'");
      }
    } else {
      throw new Error(
        "Authorization header must be provided to access the route."
      );
    }
  },
};
