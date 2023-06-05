import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import dotenv from 'dotenv'
import authMiddleware from './middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000
const bodyParserJson = express.json()

dotenv.config()
app.use(bodyParserJson)
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL
	})
)
app.use('/auth', authRouter)
app.use('/users', authMiddleware, userRouter)

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_ACCESS)
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log('error: ', e)
	}
}

startServer()
