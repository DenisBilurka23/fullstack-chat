export const userDto = data => ({
	id: data._id,
	username: data.username,
	token: data.accessToken,
	rooms: data.rooms
})
