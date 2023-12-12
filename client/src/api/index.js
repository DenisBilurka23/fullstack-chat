import axios from 'axios'
import { refresh } from './auth'

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_BASE_URL,
	withCredentials: true
})

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

api.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		const checkStatus = error.response.status === 401 && originalRequest

		console.log('originalRequest.isRetry: ', originalRequest.isRetry)
		if (checkStatus && !originalRequest.isRetry) {
			originalRequest.isRetry = true
			try {
				const res = await refresh()
				localStorage.setItem('token', res.data.accessToken)
				return api.request(originalRequest)
			} catch (e) {
				console.log('error:', e)
			}
		}

		if (checkStatus && originalRequest.isRetry) {
			localStorage.removeItem('token')
			window.location.href = '/'
		}

		throw error
	}
)

export default api
