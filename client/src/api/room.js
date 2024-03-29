import api from './index'

export const getRoom = ({ roomId, page, messagesPerPage }) => {
	return api.get(`/rooms/${roomId}/?page=${page}&messagesPerPage=${messagesPerPage}`)
}

export const deleteRoom = ({ roomId, userId, recipientId }) => {
	return api.delete(`/rooms/?roomId=${roomId}&userId=${userId}&recipientId=${recipientId}`)
}
export const createRoom = payload => api.post('/rooms', payload)
export const sendMessage = payload => api.post('/rooms/message', payload)
