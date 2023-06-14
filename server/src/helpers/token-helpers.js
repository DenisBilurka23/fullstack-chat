import jwt from 'jsonwebtoken'

export const generateTokens = payload => {
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m' })
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
	return { accessToken, refreshToken }
}

export const verifyToken = (token, secret) => {
	try {
		return jwt.verify(token, secret)
	} catch (e) {
		return null
	}
}
