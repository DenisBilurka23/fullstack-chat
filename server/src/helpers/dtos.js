import { transformImageFromName } from './image-helper.js'

export const userDto = data => ({
	createdAt: data.createdAt,
	updatedAt: data.updatedAt,
	username: data.username,
	id: data._id,
	profilePicture: transformImageFromName(data.profilePicture)
})
