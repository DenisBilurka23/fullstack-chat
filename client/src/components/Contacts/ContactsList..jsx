import { List, styled, Typography, ListItem, ListItemButton } from '@mui/material'
import CustomAvatar from '../CustomAvatar'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat } from '../../store/slices/usersSlice'

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
	const { selectedChat, user } = useSelector(state => state.users)
	const dispatch = useDispatch()

	const selectChatHandler = chat => () => {
		dispatch(selectChat(chat.id === selectedChat?.id ? null : chat))
	}
	return (
		<List
			{...(!user?.rooms && {
				sx: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexGrow: 1
				}
			})}
		>
			{user?.rooms?.map(({ name, id, img }) => (
				<Contact
					key={id}
					disableGutters
					background={selectedChat?.id === id ? '#262626' : null}
					onClick={selectChatHandler({ id, name, img })}
				>
					<ListItemButton sx={{ p: '8px 20px' }}>
						<CustomAvatar src={img} />
						<Typography size="18px" fontWeight={600}>
							{name}
						</Typography>
					</ListItemButton>
				</Contact>
			))}
			{!user?.rooms && (
				<Typography textAlign="center" p="0 1rem" color="#A8A8A8">
					You don&#39;t have any chats yet
				</Typography>
			)}
		</List>
	)
}

export default ContactsList
