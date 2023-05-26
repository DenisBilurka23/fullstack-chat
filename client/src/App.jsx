import Chat from './pages/Chat'
import { Box } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Chat />
	},
	{
		path: '/settings',
		element: <Chat />
	},
	{
		path: '/sign-in',
		element: <SignIn />
	},
	{
		path: '/sign-up',
		element: <SignUp />
	}
])

const App = () => {
	return (
		<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
			<RouterProvider router={router} />
		</Box>
	)
}

export default App
