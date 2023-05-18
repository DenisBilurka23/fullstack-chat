import { Box, Typography, IconButton, Avatar } from '@mui/material'
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
				{recipient.img ? (
					<CustomAvatar size="30px" src={recipient.img} />
				) : (
					<Avatar sx={{ bgcolor: 'grey' }}>{recipient.name[0]}</Avatar>
				)}
				<Typography size="18px" fontWeight={600}>
					{recipient.name}
				</Typography>
			</Box>
			<IconButton sx={{ color: '#fff' }} onClick={toggleConfirmationModal}>
				<DeleteOutlineIcon />
			</IconButton>
		</Box>
	)
}

export default ActiveChatTitle
