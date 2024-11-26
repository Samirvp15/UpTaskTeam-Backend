import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import cors from 'cors'
import morgan from 'morgan'
import projectRoutes from './routes/projectRoutes'
import { corsConfig } from './config/cors'
 

dotenv.config()

connectDB()

const server = express()

//Logging
server.use(morgan('dev'))
//Middlewares
server.use(cors(corsConfig))
server.use(express.json())

//Routes
server.use('/api/projects', projectRoutes)


export default server