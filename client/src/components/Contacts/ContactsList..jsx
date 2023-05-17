import { List, styled, Typography, ListItem, ListItemButton } from '@mui/material'
import CustomAvatar from '../CustomAvatar'
import { useSelector } from 'react-redux'

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
	return (
		<List>
			{user?.rooms?.map(({ name, id, img }) => (
				<Contact key={id} disableGutters>
					<ListItemButton sx={{ p: '8px 20px' }}>
						<CustomAvatar src={img} />
						<Typography size='18px' fontWeight={600}>
							{name}
						</Typography>
					</ListItemButton>
				</Contact>
			))}
		</List>
	)
}

export default ContactsList
