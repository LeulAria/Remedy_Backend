import mongoose from 'mongoose'
import consola from 'consola'

export const createDbConnection = async () => {
  await mongoose.connect(process.env.DB || '', {})

  consola.success({
    badge: true,
    message: `Successfully connected to mongodb.`,
  })
} 