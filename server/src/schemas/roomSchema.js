import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	messages: [
		{
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			text: {
				type: String
			},
			createdAt: {
				type: Number,
				default: () => Date.now()
			}
		}
	]
})

const RoomModel = mongoose.model('Room', roomSchema)

export default RoomModel
