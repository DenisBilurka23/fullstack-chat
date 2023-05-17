import Chat from './pages/Chat'
import { Box } from '@mui/material'

const App = () => {
	return (
		<Box sx={{ background: '#121212', height: '100%', display: 'flex', justifyContent: 'center' }}>
			<Chat />
		</Box>
	)
}

export default App
