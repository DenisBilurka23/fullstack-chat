import api from './index'

export const getUsers = username => api.get(username ? `users/?username=${username}` : 'users')
