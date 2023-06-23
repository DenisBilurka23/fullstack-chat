import roomServices from '../services/roomServices.js'

const roomControllers = {
	async get(req, res) {
		try {
			const roomId = req.params.roomId
			const { page, messagesPerPage } = req.query
			const room = await roomServices.get(roomId, page, messagesPerPage)
			res.json(room)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async create(req, res) {
		try {
			const { userId, recipientId } = req.body
			const data = await roomServices.create(userId, recipientId)
			res.json(data)
		} catch (e) {
			if (e.status === 400) {
				return res.status(e.status).json({ message: e.message })
			}
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async delete(req, res) {
		try {
			const { roomId, userId, recipientId } = req.query
			await roomServices.delete(roomId, userId, recipientId)
			res.sendStatus(204)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async sendMessage(req, res) {
		try {
			const data = await roomServices.sendMessage(req.body)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			if (e === 400) {
				return res.status(e).json({ message: 'room does not exist' })
			}
			res.sendStatus(500)
		}
	}
}

export default roomControllers
