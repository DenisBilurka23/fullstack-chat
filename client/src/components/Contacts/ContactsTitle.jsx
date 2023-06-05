import { Menu } from '@mui/icons-material'
import { Box, Typography, IconButton } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useSelector } from 'react-redux'
import DropDown from '../DropDown'
import { useRef, useState } from 'react'

const ContactsTitle = ({ handleToggleModal }) => {
	const { user } = useSelector(state => state.auth)
	console.log('user: ', user)
	const dropdownButtonRef = useRef(null)

	const [anchorEl, setAnchorEl] = useState(null)
	const [dropDownActive, setDropDownActive] = useState(false)

	const handleToggleDropDown = () => setDropDownActive(prev => !prev)

	const handleClickAway = event => {
		if (dropdownButtonRef.current.contains(event.target)) {
			return
		}
		setAnchorEl(null)
		handleToggleDropDown()
	}

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
		handleToggleDropDown()
	}

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
			<IconButton ref={dropdownButtonRef} sx={{ color: '#fff' }} onClick={handleClick}>
				<Menu />
			</IconButton>
			<Typography variant="h3" fontSize="18px" sx={{ cursor: 'pointer' }}>
				{user?.username}
			</Typography>
			<IconButton sx={{ color: '#fff' }} onClick={handleToggleModal}>
				<MailOutlineIcon />
			</IconButton>
			<DropDown open={dropDownActive} anchorEl={anchorEl} handleClickAway={handleClickAway} />
		</Box>
	)
}

export default ContactsTitle
