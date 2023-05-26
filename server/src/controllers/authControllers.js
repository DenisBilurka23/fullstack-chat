import UserModel from '../schemas/userSchema.js'
import { compareSync, hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

const authController = {
	async signUp(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors)
			}
			const { username, password } = req.body
			const foundUser = await UserModel.findOne({ username })
			if (foundUser) {
				return res.status(400).json({ message: 'user already created' })
			}
			const hashedPassword = hashSync(password, 7)
			const user = new UserModel({ username, password: hashedPassword })
			await user.save()
		} catch (e) {
			console.log('e: ', e)
			res.sendStatus(500)
		}
	},
	async signIn(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors)
			}
			const invalidData = () => res.status(400).json({ message: 'username or password is not correct' })
			const { username, password } = req.body
			const foundUser = await UserModel.findOne({ username })
			if (!foundUser) {
				return invalidData()
			}

			const isPasswordValid = compareSync(password, foundUser.password)
			if (!isPasswordValid) {
				invalidData()
			}
			const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
			res.json({ accessToken })
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	}
}

export default authController
