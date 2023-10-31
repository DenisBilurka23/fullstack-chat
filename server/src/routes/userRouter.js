import { Router } from 'express'
import userControllers from '../controllers/userControllers.js'
import path from 'path'
import multer from 'multer'

const userRouter = Router()
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, path.join(__basepath, 'uploads')),
	filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage })

userRouter.get('/', userControllers.getUsers)
userRouter.get('/:userId', userControllers.getUser)
userRouter.post('/', userControllers.getUsersByIds)
userRouter.patch('/:userId', upload.single('file'), userControllers.updateUser)

export default userRouter
