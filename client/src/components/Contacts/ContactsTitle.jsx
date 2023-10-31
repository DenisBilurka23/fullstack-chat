import { Box, Typography, IconButton } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useSelector } from 'react-redux'
import DropDown from '../DropDown'

const ContactsTitle = ({ handleToggleModal }) => {
	const { user } = useSelector(state => state.auth)
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
			<DropDown />
			<Typography variant="h3" fontSize="18px" sx={{ cursor: 'pointer' }}>
				{user?.username}
			</Typography>
			<IconButton sx={{ color: '#fff' }} onClick={handleToggleModal}>
				<MailOutlineIcon />
			</IconButton>
		</Box>
	)
}

export default ContactsTitle
