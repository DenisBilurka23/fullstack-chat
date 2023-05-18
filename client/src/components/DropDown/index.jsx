import { Popper, Typography, Fade, Paper, ClickAwayListener, ListItem, List } from '@mui/material'
import { styled } from '@mui/system'
import { navItems } from '../../utils/navigation-helpers'

const PopperStyled = styled(Popper)({
	position: 'absolute',
	'& .MuiPaper-root': {
		backgroundColor: '#262626',
		color: '#fff',
		borderRadius: '20px'
	}
})

const DropDown = ({ anchorEl, open, handleClickAway }) => {
	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<PopperStyled open={open} anchorEl={anchorEl} placement="bottom-start" transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Paper>
							<List>
								{navItems.map(({ title, Icon, link }) => (
									<ListItem key={link} disableGutters sx={{ padding: '8px 20px' }}>
										<Icon />
										<Typography sx={{ padding: '5px 10px' }}>{title}</Typography>
									</ListItem>
								))}
							</List>
						</Paper>
					</Fade>
				)}
			</PopperStyled>
		</ClickAwayListener>
	)
}

export default DropDown
