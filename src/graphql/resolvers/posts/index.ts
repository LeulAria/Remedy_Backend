import {
  validatePostPayloadInput,
  validatePostUpdatePayloadInput,
} from "./validators";
import { AuthenticationError, UserInputError } from "apollo-server-errors";

import { AppContext } from "../../types";
import { GraphQLResolveInfo } from "graphql";
import { IPostDeletePayload, IPostPayload } from "../../typeDefs/posts";
import { IPostModel } from "../../../models/post/types";
import { ROUTE_GUARD } from "../../../utils/auth.guard";
import { ILikePostPayload, IPostUpdatePayload } from "./../../typeDefs/posts";
import { validatePayloadAsync } from "../../../utils/validation";

export default {
  Query: {
    async getPosts(
      _: unknown,
      args: unknown,
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      try {
        const posts = await ctx.AppModels.PostModel.find()
          .sort({ createdAt: -1 })
          .populate("user");
        return posts;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async getPost(
      _: unknown,
      args: { postId: string },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      try {
        const post = await ctx.AppModels.PostModel.findById(
          args.postId
        ).populate("user");
        if (post) {
          return post;
        }
        throw new Error("Post not found");
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(
      _: unknown,
      args: { payload: IPostPayload },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      const user = ROUTE_GUARD.checkIfLoggedIn(ctx);

      const validate = await validatePayloadAsync<IPostPayload>(
        validatePostPayloadInput(args.payload)
      );

      if (validate.error) {
        throw new UserInputError("Error on validating post.", {
          errors: validate.error,
        });
      }

      const newPost = await ctx.AppModels.PostModel.create({
        post: args.payload.body,
        user: user._id,
      });

      const post = await newPost.populate("user");

      return post;
    },
    async updatePost(
      _: unknown,
      args: { payload: IPostUpdatePayload },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      const user = ROUTE_GUARD.checkIfLoggedIn(ctx);

      const validate = await validatePayloadAsync<IPostUpdatePayload>(
        validatePostUpdatePayloadInput(args.payload)
      );

      if (validate.error) {
        throw new UserInputError("Error on validating post.", {
          errors: validate.error,
        });
      }

      try {
        await ctx.AppModels.PostModel.findByIdAndUpdate(args.payload.postId, {
          post: args.payload.body,
          user: user._id,
        });

        const post = await ctx.AppModels.PostModel.findByIdAndUpdate(
          args.payload.postId
        ).populate("user");

        return post;
      } catch (error) {
        return new Error("Error occurred while updating!");
      }
    },
    /**
     * DELETE A POST
     */
    async deletePost(
      _: unknown,
      args: { payload: IPostDeletePayload },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      const user = ROUTE_GUARD.checkIfLoggedIn(ctx);

      try {
        let post: IPostModel | null = await ctx.AppModels.PostModel.findById(
          args.payload.postId
        );

        if (!post) {
          throw new Error("Post not found!");
        }

        post = await post.populate("user");

        if (typeof post.user !== "string") {
          if (!(post?.user?.username === user.username)) {
            throw new AuthenticationError("Action not allowed");
          }
        }

        await post.delete();
        return "Post deleted successfully!";
      } catch (error) {
        throw new Error(
          "Error occurred while deleting, or the post wasn't found!"
        );
      }
    },
    /**
     * LIKE A POST
     */
    async likePost(
      _: any,
      args: { payload: ILikePostPayload },
      ctx: AppContext,
      info: GraphQLResolveInfo
    ) {
      const user = ROUTE_GUARD.checkIfLoggedIn(ctx);
    },
  },
};
