import { MODELS } from '../Models'
import bcrypt from 'bcryptjs'
import { IUserModel } from './types'
import { model, Schema } from 'mongoose'
import { defaultSchemaOptions } from '../util'

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  defaultSchemaOptions
)

userSchema.pre('save', async function (next: any) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  const hashedPassword = await bcrypt.hash(user.password, 12)
  user.password = hashedPassword;
  next()
})

userSchema.methods = {}

export const UserModel = model<IUserModel>(MODELS.USER, userSchema)
