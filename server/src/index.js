import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import dotenv from 'dotenv'

const app = express()
const PORT = process.env.PORT || 5000
const bodyParserJson = express.json()

dotenv.config()
app.use(bodyParserJson)
app.use('/auth', authRouter)

const startServer = async () => {
	try {
		await mongoose.connect('mongodb+srv://vadya555555:furpflVrkne5zdvN@cluster0.eoxupqa.mongodb.net/')
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log('error: ', e)
	}
}

startServer()
