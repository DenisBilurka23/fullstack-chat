import { Outlet, Navigate } from 'react-router-dom'
import { SocketProvider } from '../../socket'

const PrivateRoutes = () => {
	const isAuth = localStorage.getItem('token')
	return isAuth ? (
		<SocketProvider>
			<Outlet />
		</SocketProvider>
	) : (
		<Navigate to="/sign-in" />
	)
}
export default PrivateRoutes
