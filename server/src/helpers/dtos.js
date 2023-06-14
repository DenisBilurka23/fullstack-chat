export const userDto = data => ({
	createdAt: data.createdAt,
	updatedAt: data.updatedAt,
	username: data.username,
	id: data._id
})
