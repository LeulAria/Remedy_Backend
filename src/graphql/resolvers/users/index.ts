import bcrypt from "bcryptjs";
import { AppContext } from "../../types";
import jwt from "jsonwebtoken";
import { GraphQLResolveInfo } from "graphql";
import { UserInputError } from "apollo-server";
import {
  validateRegisterUserInput,
  validateLoginUserInput,
} from "./validators";
import { IUserRegisterPayload, IUserLoginPayload } from "../../typeDefs/users";
import { IUserModel } from "../../../models/user/types";
import { SECRET_KEY } from "../../../config/env";

export const generateToken = (user: IUserModel) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "24h" });
};

export default {
  Query: {
    getUser: () => "user here...",
  },
  Mutation: {
    async login(
      _: any,
      args: { userCredentials: IUserLoginPayload },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      const { username, email, password } = args.userCredentials;

      const validate = await validateLoginUserInput(args.userCredentials);
      if (validate.error) {
        throw new UserInputError("Error on validating login credentials.", {
          errors: validate.error,
        });
      }

      // get user using ether username or email
      const user = username
        ? await ctx.AppModels.UserModel.findOne({ username })
        : await ctx.AppModels.UserModel.findOne({ email });

      //  check if user exist in app
      if (!user) {
        throw new UserInputError("User not found", {
          errors: {
            user: "User with the following credentials not found!",
          },
        });
      }

      // check users password
      if (!(await bcrypt.compare(password, user.password))) {
        throw new UserInputError("Incorrect Password Credential", {
          errors: {
            password: "Incorrect password.",
          },
        });
      }

      const token = generateToken({
        ...user._doc,
        ...user._id,
      } as IUserModel);

      return {
        ...user._doc,
        id: user._id,
        token,
        _id: undefined,
      };
    },
    async register(
      _: any,
      args: { userCredentials: IUserRegisterPayload },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      const { username, email, password, confirmPassword } =
        args.userCredentials;

      const validate = await validateRegisterUserInput(args.userCredentials);
      if (validate.error) {
        throw new UserInputError("Error on validating register credentials.", {
          errors: validate.error,
        });
      }

      const userExists = await ctx.AppModels.UserModel.findOne({ username });

      if (userExists) {
        throw new UserInputError("User name is taken", {
          errors: {
            username: "The username is taken",
          },
        });
      }

      const newUser = new ctx.AppModels.UserModel({
        username,
        email,
        password,
      });
      const res = await newUser.save();

      const token = generateToken({
        ...res._doc,
        ...res._id,
      } as IUserModel);

      return {
        ...res._doc,
        id: res._id,
        token,
        _id: undefined,
      };
    },
  },
};
