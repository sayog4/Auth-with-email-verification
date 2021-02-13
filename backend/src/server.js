import { GraphQLServer } from 'graphql-yoga'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './db/db'
import models from './models'
import resolvers from './resolvers'
import { verifyToken } from './utils/jwtTokens'

connectDB()

const server = new GraphQLServer({
  resolvers,
  typeDefs: './src/schema.graphql',
  context: req => {
    return {
      req,
      models
    }
  }
})

server.express.use(cookieParser())

server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    req.userId = verifyToken(token)
  }
  next()
})

server.express.use(async (req, res, next) => {
  if (!req.userId) return next()

  const user = await models.User.findById(req.userId).select('_id name email')

  req.user = user
  next()
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL
    },
    endpoint: '/graphql',
    port: process.env.PORT || 4000
  },
  server => console.log(`Server Running on http://localhost:${server.port}`)
)
