import mongoose, { Schema } from 'mongoose'
// database schema for users e
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const User = mongoose.model('user', userSchema)
