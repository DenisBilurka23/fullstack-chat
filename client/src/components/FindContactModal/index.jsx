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
import { selectRoom } from '../../store/slices/roomSlice'
import { getUsersThunk } from '../../store/thunks/usersThunk'
import { createRoomThunk } from '../../store/thunks/roomThunk'
import Loader from '../Loader'
import { refreshThunk } from '../../store/thunks/authThunk'

const Modal = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-paper': {
		backgroundColor: '#262626',
		color: '#fff',
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
	const { users, loading } = useSelector(state => state.users)
	const authUser = useSelector(state => state.auth.user)
	const { selectedRoom } = useSelector(state => state.rooms)
	const excludedSelfUsers = useMemo(() => users?.filter(user => user.id !== authUser?.id), [users, authUser])
	const [selectedContact, setSelectedContact] = useState(null)

	const handleContactClick = contact => () => setSelectedContact(prev => (prev?.id !== contact.id ? contact : null))
	const handleChatSelect = user => async () => {
		const foundRoom = authUser.rooms.find(room => room.recipientId === user.id)
		if (foundRoom) {
			dispatch(selectRoom(foundRoom))
			return onClose()
		}
		const actionResult = await dispatch(createRoomThunk({ userId: authUser.id, recipientId: user.id }))
		if (!actionResult.err) {
			dispatch(refreshThunk())
		}
		onClose()
	}
	const closeModalHandler = () => {
		setSelectedContact(selectedRoom)
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
				dispatch(getUsersThunk(search))
			}, 300),
		[]
	)

	const handleSearch = e => {
		setSearchValue(e.target.value)
		debouncedApiRequest(e.target.value)
	}

	useEffect(() => {
		if (open) {
			dispatch(getUsersThunk())
		}
	}, [open])

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
			<DialogContent sx={{ p: '0 0 16px 0' }}>
				<Box pt="16px" display="flex" alignItems="center">
					<Typography px="16px" fontSize={14} fontWeight={700}>
						To:{' '}
					</Typography>
					{selectedContact && (
						<SelectedUser onClick={handleUnselectContact}>
							<Typography fontSize="14px" mr="10px">
								{selectedContact.username}
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
					{excludedSelfUsers?.map(user => (
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
											<Avatar sx={{ bgcolor: 'grey' }}>{user?.username[0]}</Avatar>
										) : (
											<CustomAvatar size="44px" src={user.img} />
										)}
									</ListItemAvatar>
									<ListItemText primary={user?.username} />
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
			{loading && <Loader />}
		</Modal>
	)
}

export default FindContactModal
