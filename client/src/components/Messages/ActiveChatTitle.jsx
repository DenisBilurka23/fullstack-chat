import { Box, Typography, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CustomAvatar from '../CustomAvatar'

const ActiveChatTitle = ({ recipient, toggleConfirmationModal }) => {
	return (
		<Box
			sx={{
				height: '60px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				px: '28px',
				borderBottom: '1px solid rgb(38, 38, 38)'
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', px: '10px' }}>
				<CustomAvatar size="30px" src={recipient.img} name={recipient.username} />
				<Typography size="18px" fontWeight={600}>
					{recipient.username}
				</Typography>
			</Box>
			<IconButton sx={{ color: '#fff' }} onClick={toggleConfirmationModal}>
				<DeleteOutlineIcon />
			</IconButton>
		</Box>
	)
}

export default ActiveChatTitle
