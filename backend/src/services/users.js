import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'
import jwt from 'jsonwebtoken'

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })

  return await user.save()
}

//user login service function

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username }) // find the the user in the database
  if (!user) {
    throw new Error('invalid username') // if user name is not found and error is throwed
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password) // compares hased password to user provided password
  if (!isPasswordCorrect) {
    throw new Error('invalid password')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  }) // assigngs jwt tokens for the user for authentication

  return token
}

export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    if (!user) return { username: userId }
    return { username: user.username }
  } catch (err) {
    return { username: userId }
  }
}
