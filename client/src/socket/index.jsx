import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUsers } from '../store/slices/usersSlice'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const dispatch = useDispatch()
	const [socket, setSocket] = useState(null)
	const { user } = useSelector(state => state.auth)

	useEffect(() => {
		const socket = io(process.env.REACT_APP_SOCKET_URL)
		setSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (user && socket) {
			socket.emit('saveUser', user.id)
			socket.on('getUsers', users => {
				dispatch(setOnlineUsers(users))
			})
		}
	}, [user, socket])

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketContext
