import { List, styled, Typography, ListItem, ListItemButton } from '@mui/material'
import CustomAvatar from '../CustomAvatar'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoom } from '../../store/slices/roomSlice'
import { getUsersByIdsThunk } from '../../store/thunks/usersThunk'
import { useEffect } from 'react'

const Contact = styled(ListItem)(({ background }) => ({
	display: 'flex',
	alignItems: 'center',
	transition: 'ease .15s background',
	padding: 0,
	background,
	'&:hover': {
		cursor: 'pointer',
		background: '#1a1a1a'
	}
}))

const ContactsList = () => {
	const { user } = useSelector(state => state.auth)
	const { userChats, usersOnline } = useSelector(state => state.users)
	const { selectedRoom } = useSelector(state => state.rooms)
	const dispatch = useDispatch()

	const selectChatHandler = userId => () => {
		if (selectedRoom?.recipientId === userId) {
			return dispatch(selectRoom(null))
		}
		dispatch(selectRoom(user.rooms.find(({ recipientId }) => recipientId === userId)))
	}

	const checkOnline = (uOnline, u) => !!uOnline?.find(({ userId }) => userId === u)

	useEffect(() => {
		if (user?.rooms) {
			const parsedIds = user.rooms?.map(({ recipientId }) => recipientId)
			dispatch(getUsersByIdsThunk(parsedIds))
		}
	}, [user?.rooms])

	return (
		<List
			{...(!user?.rooms?.length && {
				sx: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexGrow: 1
				}
			})}
		>
			{userChats?.map(({ username, id, profilePicture }) => (
				<Contact
					key={id}
					disableGutters
					background={selectedRoom?.recipientId === id ? '#262626' : null}
					onClick={selectChatHandler(id)}
				>
					<ListItemButton sx={{ p: '8px 20px' }}>
						<CustomAvatar src={profilePicture} name={username} online={checkOnline(usersOnline, id)} />
						<Typography size="18px" fontWeight={600}>
							{username}
						</Typography>
					</ListItemButton>
				</Contact>
			))}
			{!user?.rooms?.length && (
				<Typography textAlign="center" p="0 1rem" color="#A8A8A8">
					You don&#39;t have any chats yet
				</Typography>
			)}
		</List>
	)
}

export default ContactsList
