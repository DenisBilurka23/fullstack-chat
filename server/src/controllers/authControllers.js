import { validationResult } from 'express-validator'
import authServices from '../services/authServices.js'

const auth = fn => async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors)
		}
		const { username, password } = req.body
		const data = await fn(username, password)
		res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
		res.json(data)
	} catch (e) {
		console.log('error: ', e)
		res.status(400).send({ error: e.message })
	}
}

const authController = {
	signUp: auth(authServices.signUp),
	signIn: auth(authServices.signIn),
	signOut: async (req, res) => {
		const { refreshToken } = req.cookies
		try {
			await authServices.signOut(refreshToken)
			res.clearCookie('refreshToken')
			res.sendStatus(204)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	refresh: async (req, res) => {
		const { refreshToken } = req.cookies
		if (!refreshToken) {
			return res.sendStatus(401)
		}
		try {
			const data = await authServices.refresh(refreshToken)
			console.log('data: ', data)
			res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			res.json(data)
		} catch (e) {
			res.sendStatus(e === 401 ? e : 500)
		}
	}
}

export default authController
