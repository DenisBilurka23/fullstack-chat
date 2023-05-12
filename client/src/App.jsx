import Chat from './pages/Chat'
import { Box } from '@mui/material'

const App = () => {
	return (
		<Box className='App' sx={{ background: '#121212', height: '100%', display: 'flex' }}>
			<Chat />
		</Box>
	)
}

export default App
