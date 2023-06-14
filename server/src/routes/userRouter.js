import { Router } from 'express'
import userControllers from '../controllers/userControllers.js'

const userRouter = Router()

userRouter.get('/', userControllers.getUsers)
userRouter.get('/:userId', userControllers.getUser)
userRouter.post('/', userControllers.getUsersByIds)

export default userRouter
