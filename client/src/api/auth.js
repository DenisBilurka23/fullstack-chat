import api from './index'
import axios from 'axios'

export const signIn = payload => api.post('auth/sign-in', payload)
export const signUp = payload => api.post('auth/sign-up', payload)
export const signOut = () => api.post('auth/sign-out')
export const refresh = () => {
	return axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`, { withCredentials: true })
}
