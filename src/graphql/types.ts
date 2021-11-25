import { Model } from 'mongoose'
import { IUserModel } from '../models/user/types'
import {
  ICommentLikeModel,
  ICommentModel,
  IPostLikeModel,
  IPostModel,
  IPostSeenModel,
} from '../models/post/types'

export interface AppContext {
  req: any;
  AppModels: {
    UserModel: Model<IUserModel>
    PostModel: Model<IPostModel>
    PostLikeModel: Model<IPostLikeModel>
    PostSeenModel: Model<IPostSeenModel>
    CommentModel: Model<ICommentModel>
    CommentLikeModel: Model<ICommentLikeModel>
  }
}
