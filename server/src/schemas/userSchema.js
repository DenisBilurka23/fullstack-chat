import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
	username: { type: String, required: true, minLength: 5, maxLength: 30, unique: true },
	password: { type: String, required: true },
	rooms: { type: [String], ref: 'Room' },
	createdAt: { type: Number, default: () => Date.now() },
	updatedAt: { type: Number, default: () => Date.now() }
})

export default model('User', userSchema)