import UserModel from '../schemas/userSchema.js'
import UserSchema from '../schemas/userSchema.js'
import { userDto } from '../helpers/dtos.js'

const userServices = {
	async get(username) {
		const regex = new RegExp(`^${username}`, 'i')
		const users = await UserModel.find(username ? { username: { $regex: regex } } : null)
		return users.map(user => userDto(user))
	},
	async getByIds(ids) {
		const users = await UserSchema.find({ _id: { $in: ids } })
		return users.map(user => userDto(user))
	},
	async getById(id) {
		const user = await UserSchema.findById(id)
		return userDto(user)
	},
	async update(id, body) {
		const user = await UserSchema.findById(id)
		if (body.username) {
			user.username = body.username
		}
		if (body.file) {
			user.profilePicture = body.file.filename
		}
		return user.save()
	}
}

export default userServices
