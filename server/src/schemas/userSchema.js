import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	username: { type: String, required: true, minLength: 5, maxLength: 30, unique: true },
	password: { type: String, required: true },
	profilePicture: { type: String },
	rooms: [
		{
			roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
			recipientId: { type: Schema.Types.ObjectId }
		},
		{ _id: false }
	],
	createdAt: { type: Number, default: () => Date.now() },
	updatedAt: { type: Number, default: () => Date.now() }
})

export default model('User', userSchema)
