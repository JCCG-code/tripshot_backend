// Packages
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()

// Routes
import authRouter from './routers/auth.router.js'
import usersRouter from './routers/users.router.js'
import postsRouter from './routers/posts.router.js'

// Initializations
const app = express()
const port = process.env.PORT

// Middewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Using routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

// Server and database are listening
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log('[server] Mongoose connection has been done successfully'))
  .catch((err) => console.log(err))
app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`)
})
