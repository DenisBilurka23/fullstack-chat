import { Router } from 'express'
import userControllers from '../controllers/userControllers.js'

const userRouter = Router()

userRouter.get('/', userControllers.getUsers)

export default userRouter
