import { Router } from 'express'
import authController from '../controllers/authControllers.js'
import { check } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware.js'

const authRouter = Router()

authRouter.post(
	'/sign-up',
	[
		check('username', 'username can not be empty').notEmpty(),
		check('password', 'password should contain from 6 to 20 characters').isLength({ min: 6, max: 20 })
	],
	authController.signUp
)
authRouter.post(
	'/sign-in',
	check(['username', 'password'], 'fields can not be blank').notEmpty(),
	authController.signIn
)
authRouter.post('/sign-out', authMiddleware, authController.signOut)
authRouter.get('/refresh', authController.refresh)

export default authRouter
