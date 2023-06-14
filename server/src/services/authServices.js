import UserModel from '../schemas/userSchema.js'
import { compareSync, hashSync } from 'bcrypt'
import { generateTokens, verifyToken } from '../helpers/token-helpers.js'
import TokenModel from '../schemas/tokenSchema.js'

const authServices = {
	async signUp(username, password) {
		const foundUser = await UserModel.findOne({ username })
		if (foundUser) {
			throw new Error('user already created')
		}
		const hashedPassword = hashSync(password, 7)
		const user = new UserModel({ username, password: hashedPassword })
		await user.save()
		const tokens = generateTokens({ userId: user._id, username })
		const data = { userId: user._id, refreshToken: tokens.refreshToken }
		await TokenModel.create(data)
		return { ...data, accessToken: tokens.accessToken }
	},
	async signIn(username, password) {
		const errorMessage = 'Sorry, your password was incorrect. Please double-check your password.'
		const user = await UserModel.findOne({ username })
		if (!user) {
			throw new Error(errorMessage)
		}

		const isPasswordValid = compareSync(password, user.password)
		if (!isPasswordValid) {
			throw new Error(errorMessage)
		}

		const tokens = generateTokens({ userId: user._id, username: user.username })
		let userToken = await TokenModel.findOne({ userId: user._id })
		userToken
			? (userToken.refreshToken = tokens.refreshToken)
			: (userToken = new TokenModel({ userId: user._id, refreshToken: tokens.refreshToken }))

		await userToken.save()

		return { userId: user._id, username: user.username, ...tokens }
	},
	async signOut(refreshToken) {
		await TokenModel.deleteOne({ refreshToken })
	},
	async refresh(refreshToken) {
		const verifiedRefreshToken = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
		const dbToken = await TokenModel.findOne({ refreshToken })
		if (!verifiedRefreshToken || !dbToken) {
			throw 401
		}
		const updatedUserData = await UserModel.findById(verifiedRefreshToken.userId)
		const { username, userId } = verifiedRefreshToken
		const tokens = generateTokens({ username, userId })
		dbToken.refreshToken = tokens.refreshToken
		dbToken.username = updatedUserData.username
		await dbToken.save()

		return {
			...tokens,
			_id: updatedUserData._id,
			username: updatedUserData.username,
			rooms: updatedUserData.rooms,
			createdAt: updatedUserData.createdAt,
			updatedAt: updatedUserData.updatedAt
		}
	}
}

export default authServices
