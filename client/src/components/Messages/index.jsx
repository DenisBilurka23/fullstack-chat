import { Box, Button, Typography } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'

const Messages = ({ handleToggleModal }) => {
	return (
		<Box sx={{ flexBasis: '70%', height: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					flexDirection: 'column'
				}}
			>
				<TelegramIcon sx={{ fontSize: '56px', p: '15px', border: '1px solid #fff', borderRadius: '50%' }} />
				<Typography fontSize='20px' sx={{ mt: '8px' }}>
					Your messages
				</Typography>
				<Typography color='#A8A8A8' sx={{ my: '8px' }}>
					Send private photos and messages to a friend or group
				</Typography>
				<Button variant='contained' sx={{ my: '16px' }} onClick={handleToggleModal}>
					Send message
				</Button>
			</Box>
		</Box>
	)
}

export default Messages
