import { Document } from 'mongoose'
import { IUserModel } from '../user/types'

export interface IPostModel extends Document {
  user: IUserModel | string
  post: string
}

export interface IPostLikeModel extends Document {
  post: IPostModel | string
  user: IUserModel | string
}

export interface IPostSeenModel extends Document {
  post: IPostModel | string
  user: IUserModel | string
}

export interface ICommentModel extends Document {
  comment: string
  post: IPostModel | string
  user: IUserModel | string
  parentCommentId: ICommentModel | string | null
}

export interface ICommentLikeModel extends Document {
  commentId: ICommentModel
  user: IUserModel | string
}
