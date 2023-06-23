import UserModel from '../schemas/userSchema.js'
import RoomModel from '../schemas/roomSchema.js'
import { Types } from 'mongoose'

const roomServices = {
	async get(roomId, page = 1, messagesPerPage = 10) {
		const skipCount = (+page - 1) * +messagesPerPage
		const room = await RoomModel.findById(roomId).select({
			messages: { $slice: [-(skipCount + +messagesPerPage), +messagesPerPage] }
		})
		const messageCount = await RoomModel.aggregate([
			{ $match: { _id: Types.ObjectId.createFromHexString(roomId) } },
			{
				$project: {
					messageCount: { $size: '$messages' }
				}
			}
		])
		const totalMessages = messageCount[0].messageCount

		return {
			messages: room.messages,
			users: room.users,
			totalMessages,
			totalPages: Math.ceil(totalMessages / messagesPerPage)
		}
	},
	async create(userId, recipientId) {
		const user = await UserModel.findById(userId)
		const recipient = await UserModel.findById(recipientId)
		const roomExists =
			user?.rooms?.find(room => room.recipientId.equals(recipientId)) ||
			recipient?.rooms?.find(room => room.recipientId.equals(userId))
		if (roomExists) {
			throw { status: 400, message: 'room already exist' }
		}
		const room = new RoomModel({ users: [userId, recipientId] })
		user.rooms = [...user.rooms, { recipientId, roomId: room._id }]
		recipient.rooms = [...recipient.rooms, { recipientId: userId, roomId: room._id }]
		await room.save()
		await user.save()
		await recipient.save()
		return { room, user, recipientId }
	},
	async delete(roomId, userId, recipientId) {
		await RoomModel.deleteOne({ _id: roomId })
		const user = await UserModel.findById(userId)
		const recipient = await UserModel.findById(recipientId)
		const users = [user, recipient]
		users.map(async usr => {
			usr.rooms = usr.rooms.filter(room => !room.roomId.equals(roomId))
			await usr.save()
		})
	},
	async sendMessage({ roomId, text, sender }) {
		const room = await RoomModel.findById(roomId)
		if (!room) {
			throw 400
		}
		room.messages = [...room.messages, { sender, text }]
		await room.save()
		return { sender, text, createdAt: Date.now() }
	}
}

export default roomServices
