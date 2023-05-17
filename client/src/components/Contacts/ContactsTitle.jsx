import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Typography, IconButton } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useSelector } from 'react-redux'

const ContactsTitle = ({ handleToggleModal }) => {
	const name = useSelector(state => state.users.user.name)
	return (
		<Box
			sx={{
				height: '60px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				px: '20px',
				borderBottom: '1px solid rgb(38, 38, 38)'
			}}
		>
			<IconButton sx={{ color: '#fff' }}>
				<SettingsIcon />
			</IconButton>
			<Typography variant='h3' fontSize='18px' sx={{ cursor: 'pointer' }}>
				{name}
			</Typography>
			<IconButton sx={{ color: '#fff' }} onClick={handleToggleModal}>
				<MailOutlineIcon />
			</IconButton>
		</Box>
	)
}

export default ContactsTitle
