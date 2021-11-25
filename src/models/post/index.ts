import { model, Schema } from "mongoose";
import { MODELS } from "../Models";
import { defaultSchemaOptions } from "../util";
import {
  IPostModel,
  IPostLikeModel,
  IPostSeenModel,
  ICommentModel,
  ICommentLikeModel,
} from "./types";

const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    likeCount: Number,
  },
  defaultSchemaOptions
);

const postLikeSchema = new Schema(
  {
    post: {
      type: ObjectId,
      ref: MODELS.POST,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: MODELS.USER,
      required: true,
    },
  },
  defaultSchemaOptions
);
postLikeSchema.index({ post: 1, user: 1 }, { unique: true });

const postSeenSchema = new Schema(
  {
    post: {
      type: ObjectId,
      ref: MODELS.POST,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: MODELS.USER,
      required: true,
    },
  },
  defaultSchemaOptions
);
postSeenSchema.index({ post: 1, user: 1 }, { unique: true });

const commentSchema = new Schema(
  {
    post: {
      type: ObjectId,
      ref: MODELS.POST,
      required: true,
    },
    parentCommentId: {
      type: ObjectId,
      ref: MODELS.COMMENT,
      required: false,
    },
    user: {
      type: ObjectId,
      ref: MODELS.USER,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  defaultSchemaOptions
);

const commentLikeSchema = new Schema(
  {
    commentId: {
      type: ObjectId,
      ref: MODELS.COMMENT,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: MODELS.USER,
      required: true,
    },
  },
  defaultSchemaOptions
);
commentLikeSchema.index({ commentId: 1, user: 1 }, { unique: true });

export const PostModel = model<IPostModel>(MODELS.POST, postSchema);
export const CommentModel = model<ICommentModel>(MODELS.COMMENT, commentSchema);
export const PostLikeModel = model<IPostLikeModel>(
  MODELS.POSTLIKE,
  postLikeSchema
);
export const PostSeenModel = model<IPostSeenModel>(
  MODELS.POSTSEEN,
  postSeenSchema
);
export const CommentLikeModel = model<ICommentLikeModel>(
  MODELS.COMMENTLIKE,
  commentLikeSchema
);
