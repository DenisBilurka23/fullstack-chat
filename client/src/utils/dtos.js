export const userDto = data => ({
	id: data.userId,
	username: data.username,
	token: data.accessToken
})
