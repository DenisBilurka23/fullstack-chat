import UserSchema from '../schemas/userSchema.js'

const userControllers = {
	async getUsers(req, res) {
		try {
			const username = req.query.username
			const regex = new RegExp(`^${username}`, 'i')
			const users = await UserSchema.find(username ? { username: { $regex: regex } } : null)
			res.json(users)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	}
}

export default userControllers
