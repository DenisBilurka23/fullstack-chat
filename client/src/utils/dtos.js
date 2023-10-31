export const userDto = data => ({
	id: data._id,
	username: data.username,
	token: data.accessToken,
	profilePicture: data.profilePicture,
	rooms: data.rooms
})
