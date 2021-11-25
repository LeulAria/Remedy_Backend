import { Document } from 'mongoose'

export interface IUserModel extends Document {
  email: string
  username: string
  password: string
  _doc: any
}
