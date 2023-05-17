import {
	List,
	ListItemText,
	ListItemButton,
	ListItemAvatar,
	ListItem,
	Button,
	DialogContent,
	IconButton,
	Avatar,
	DialogTitle,
	Dialog,
	Typography,
	styled,
	Box,
	Input
} from '@mui/material'
import { Close, CheckCircle } from '@mui/icons-material'
import CustomAvatar from '../CustomAvatar'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat } from '../../store/slices/usersSlice'

const Modal = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-paper': {
		backgroundColor: '#262626',
		color: '#fff',
		width: '250px',
		[theme.breakpoints.up(750)]: {
			width: '400px'
		}
	}
}))

const Circle = styled(Box)({
	width: '24px',
	height: '24px',
	border: '1px solid white',
	borderRadius: '50%'
})

const FindContactModal = ({ onClose, open }) => {
	const dispatch = useDispatch()
	const { users } = useSelector(state => state.users)
	const [selectedContact, setSelectedContact] = useState(null)
	const handleContactClick = contact => () => setSelectedContact(prev => (prev === contact ? null : contact))

	const handleChatSelect = chat => () => {
		//TODO: Add check on existing room for user, create or fetch one depending on that
		dispatch(selectChat(chat))
		onClose()
	}

	return (
		<Modal onClose={onClose} open={open}>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					p: '5px',
					alignItems: 'center',
					borderBottom: '1px solid #363636'
				}}
			>
				<IconButton onClick={onClose} sx={{ color: '#fff' }}>
					<Close />
				</IconButton>
				<Typography fontWeight={700}>New message</Typography>
				<Button onClick={handleChatSelect(selectedContact)}>Next</Button>
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<Box pt='16px' display='flex' alignItems='center'>
					<Typography px='16px' fontSize={14} fontWeight={700}>
						To:{' '}
					</Typography>
					<Input
						fullWidth
						sx={{ pr: '16px', input: { color: '#fff' } }}
						placeholder='Search...'
						disableUnderline
					/>
				</Box>
				<Typography fontSize={14} fontWeight={700} p='16px'>
					Suggested
				</Typography>
				<List sx={{ p: 0 }}>
					{users.map(user => (
						<ListItem
							sx={{ p: 0, '&:hover': { background: '#3c3c3c' }, transition: 'ease background .2s' }}
							key={user?.id}
							disableGutters
						>
							<ListItemButton
								sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
								onClick={handleContactClick(user?.id)}
							>
								<Box display='flex'>
									<ListItemAvatar>
										{!user?.img ? (
											<Avatar sx={{ bgcolor: 'grey' }}>{user?.name[0]}</Avatar>
										) : (
											<CustomAvatar size='44px' src={user.img} />
										)}
									</ListItemAvatar>
									<ListItemText primary={user?.name} />
								</Box>
								{selectedContact === user?.id ? (
									<CheckCircle sx={{ fontSize: '29px', color: 'rgb(0, 149, 246)' }} />
								) : (
									<Circle />
								)}
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</DialogContent>
		</Modal>
	)
}

export default FindContactModal
