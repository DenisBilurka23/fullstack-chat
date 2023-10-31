import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import dotenv from 'dotenv'
import authMiddleware from './middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import roomRouter from './routes/roomRouter.js'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path'
import url from 'url'

const app = express()
const PORT = process.env.PORT || 8000
const bodyParserJson = express.json()
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
global.__basepath = __dirname

dotenv.config()
app.use(bodyParserJson)
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL
	})
)
app.use('/auth', authRouter)
app.use('/users', authMiddleware, userRouter)
app.use('/rooms', authMiddleware, roomRouter)

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
})

let users = []

io.on('connection', socket => {
	console.log('A user connected')

	socket.on('saveUser', userId => {
		if (!users.some(user => user.userId === userId)) {
			users = [...users, { userId, socketId: socket.id }]
		}
		io.emit('getUsers', users)
	})

	socket.on('sendMessage', (sender, recipientId, text) => {
		const user = users.find(user => user.userId === recipientId)
		socket.to(user?.socketId).emit('getMessage', { sender, text, createdAt: Date.now() })
	})

	socket.on('disconnect', () => {
		users = users.filter(user => user.socketId !== socket.id)
		io.emit('getUsers', users)
		console.log('A user disconnected')
	})
})

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_ACCESS)
		server.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log('error: ', e)
	}
}

startServer()
