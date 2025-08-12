import mongoose from 'mongoose'
const connection = mongoose

export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL
  mongoose.connect(DATABASE_URL)
  mongoose.connection.on('open', () => {
    console.info('Database connected successfully:', DATABASE_URL)
  })

  return connection
}
