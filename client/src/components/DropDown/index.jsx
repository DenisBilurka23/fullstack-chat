import { Popper, Typography, Fade, Paper, ClickAwayListener, ListItem, List, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { navItems } from '../../utils/navigation-helpers'
import { Link, useNavigate } from 'react-router-dom'
import { signOutThunk } from '../../store/thunks/authThunk'
import { useDispatch } from 'react-redux'
import { Menu } from '@mui/icons-material'
import { useRef, useState } from 'react'

const PopperStyled = styled(Popper)({
	position: 'absolute',
	'& .MuiPaper-root': {
		backgroundColor: '#262626',
		color: '#fff',
		borderRadius: '20px'
	},
	a: {
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none'
	}
})

const DropDown = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const dropdownButtonRef = useRef(null)
	const [anchorEl, setAnchorEl] = useState(null)
	const [open, setOpen] = useState(false)

	const handleItemClick = link => async e => {
		if (link === '/sign-out') {
			e.preventDefault()
			dispatch(signOutThunk())
			const resultAction = await dispatch(signOutThunk())
			if (!resultAction.error) {
				navigate('/sign-in')
			}
		}
	}

	const handleToggleDropDown = () => setOpen(prev => !prev)

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
		<>
			<IconButton ref={dropdownButtonRef} sx={{ color: '#fff' }} onClick={handleClick}>
				<Menu />
			</IconButton>
			<ClickAwayListener onClickAway={handleClickAway}>
				<PopperStyled open={open} anchorEl={anchorEl} placement="bottom-start" transition>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<Paper>
								<List>
									{navItems.map(({ title, Icon, link }) => (
										<ListItem
											onClick={handleClickAway}
											key={link}
											disableGutters
											sx={{ padding: '8px 20px' }}
										>
											<Link to={link} onClick={handleItemClick(link)}>
												<Icon />
												<Typography sx={{ padding: '5px 10px' }}>{title}</Typography>
											</Link>
										</ListItem>
									))}
								</List>
							</Paper>
						</Fade>
					)}
				</PopperStyled>
			</ClickAwayListener>
		</>
	)
}

export default DropDown
