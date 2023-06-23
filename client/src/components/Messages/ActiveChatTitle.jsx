import { Box, Typography, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CustomAvatar from '../CustomAvatar'
import { useSelector } from 'react-redux'

const ActiveChatTitle = ({ recipient, toggleConfirmationModal }) => {
	const { usersOnline } = useSelector(state => state.users)
	const checkOnline = (uOnline, u) => !!uOnline?.find(({ userId }) => userId === u)

	return (
		<Box
			sx={{
				height: '60px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				px: '28px',
				borderBottom: '1px solid rgb(38, 38, 38)',
				flexShrink: 0
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', px: '10px' }}>
				<CustomAvatar size="30px" src={recipient.img} name={recipient.username} />
				<Box>
					<Typography fontWeight={600}>{recipient.username}</Typography>
					{checkOnline(usersOnline, recipient.id) && (
						<Typography fontSize="14px" color="rgb(168, 168, 168)">
							Online
						</Typography>
					)}
				</Box>
			</Box>
			<IconButton sx={{ color: '#fff' }} onClick={toggleConfirmationModal}>
				<DeleteOutlineIcon />
			</IconButton>
		</Box>
	)
}

export default ActiveChatTitle
