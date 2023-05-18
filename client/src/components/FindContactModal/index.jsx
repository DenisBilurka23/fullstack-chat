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
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat } from '../../store/slices/usersSlice'

const Modal = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-paper': {
		backgroundColor: '#262626',
		color: '#fff',
		width: '250px',
		borderRadius: '20px',
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

const SelectedUser = styled(Box)({
	background: '#e3f0fe',
	borderRadius: '25px',
	color: '#3692ee',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	padding: '4px 12px',
	marginRight: '10px'
})

const FindContactModal = ({ onClose, open }) => {
	const dispatch = useDispatch()
	const [searchValue, setSearchValue] = useState('')
	const { users, user, selectedChat } = useSelector(state => state.users)
	const [selectedContact, setSelectedContact] = useState(null)
	const selectedUser = useMemo(() => user.rooms.find(({ id }) => id === selectedContact?.id), [selectedContact])
	const handleContactClick = contact => () => setSelectedContact(prev => (prev?.id !== contact.id ? contact : null))

	const handleChatSelect = chat => () => {
		//TODO: Add check on existing room for user, create or fetch one depending on that
		dispatch(selectChat(chat))
		onClose()
	}

	const closeModalHandler = () => {
		setSelectedContact(selectedChat)
		onClose()
	}

	const handleUnselectContact = () => setSelectedContact(null)

	const debounce = (func, delay) => {
		let timeoutId

		return function (...args) {
			clearTimeout(timeoutId)

			timeoutId = setTimeout(() => {
				func.apply(this, args)
			}, delay)
		}
	}

	const debouncedApiRequest = useMemo(
		() =>
			debounce(search => {
				// Perform API request here with the debounced search value
				console.log('Performing API request with search value:', search)
			}, 300),
		[]
	)

	const handleSearch = e => {
		setSearchValue(e.target.value)
		debouncedApiRequest(e.target.value)
	}
	useEffect(() => {
		setSelectedContact(selectedChat)
	}, [selectedChat])

	return (
		<Modal onClose={closeModalHandler} open={open}>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					p: '5px',
					alignItems: 'center',
					borderBottom: '1px solid #363636'
				}}
			>
				<IconButton onClick={closeModalHandler} sx={{ color: '#fff' }}>
					<Close />
				</IconButton>
				<Typography fontWeight={700}>New message</Typography>
				<Button onClick={handleChatSelect(selectedContact)}>Next</Button>
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<Box pt="16px" display="flex" alignItems="center">
					<Typography px="16px" fontSize={14} fontWeight={700}>
						To:{' '}
					</Typography>
					{selectedUser?.name && (
						<SelectedUser onClick={handleUnselectContact}>
							<Typography fontSize="14px" mr="10px">
								{selectedUser.name}
							</Typography>
							<Close fontSize="14px" />
						</SelectedUser>
					)}
					<Input
						fullWidth
						sx={{ pr: '16px', input: { color: '#fff' } }}
						placeholder="Search..."
						disableUnderline
						value={searchValue}
						onChange={handleSearch}
					/>
				</Box>
				<Typography fontSize={14} fontWeight={700} p="16px">
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
								onClick={handleContactClick(user)}
							>
								<Box display="flex">
									<ListItemAvatar>
										{!user?.img ? (
											<Avatar sx={{ bgcolor: 'grey' }}>{user?.name[0]}</Avatar>
										) : (
											<CustomAvatar size="44px" src={user.img} />
										)}
									</ListItemAvatar>
									<ListItemText primary={user?.name} />
								</Box>
								{selectedContact?.id === user?.id ? (
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