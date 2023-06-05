import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.sendStatus(401)
		}
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		next()
	} catch (e) {
		console.log('error: ', e)
		res.sendStatus(401)
	}
}

export default authMiddleware
