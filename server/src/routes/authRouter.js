import { Router } from 'express'
import authController from '../controllers/authControllers.js'
import { check } from 'express-validator'

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

export default authRouter
