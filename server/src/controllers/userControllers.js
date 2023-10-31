import userServices from '../services/userServices.js'

const userControllers = {
	async getUsers(req, res) {
		try {
			const username = req.query.username
			const data = await userServices.get(username)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async getUsersByIds(req, res) {
		const userIds = req.body
		try {
			const data = await userServices.getByIds(userIds)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async getUser(req, res) {
		try {
			const userId = req.params.userId
			const data = await userServices.getById(userId)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async updateUser(req, res) {
		try {
			const userId = req.params.userId
			const body = req.body
			const data = await userServices.update(userId, { username: body.username, file: req.file })
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.status(400).json(e)
		}
	}
}

export default userControllers
