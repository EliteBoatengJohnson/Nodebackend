import { MongoMemoryServer } from 'mongodb-memory-server'
import process from 'node:process'

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '5.0.8', // Changed from 6.0.2 to 5.0.8 for better compatibility
      // Alternative: you can also try '4.4.18' or '7.0.0'
    },
    instance: {
      // Optional: specify database name
      dbName: 'testdb',
    },
  })

  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()

  // Optional: log the connection URI for debugging
  console.log('MongoDB Memory Server started:', instance.getUri())
}
