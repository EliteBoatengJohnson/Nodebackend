import express from 'express'
import { postRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
app.use(cors())
// app.use(
//   cors({
//     origin:[
//       'https://vigilant-train-4rrxjvjqwqv3qg47-5173.app.github.dev/',
//       'http://localhost:5173/'],
//     credentials: true,
//   })
// )

app.use(bodyParser.json())

postRoutes(app)
app.get('/', (req, res) => res.send('Hello, world from Express!'))

export { app }
