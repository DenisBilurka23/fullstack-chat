import Chat from './pages/Chat'
import { Box } from '@mui/material'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { refreshThunk } from './store/thunks/authThunk'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PrivateRoutes from './components/PrivateRoutes'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route element={<PrivateRoutes />}>
				<Route element={<Chat />} index />
				<Route path="/settings" element={<Chat />} />
			</Route>
		</>
	)
)

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshThunk())
	}, [])

	return (
		<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
			{/*<RouterProvider router={router} />*/}
			<RouterProvider router={router} />
		</Box>
	)
}

export default App
