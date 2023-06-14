import { Avatar, Box } from '@mui/material'

const CustomAvatar = ({ src, size, name }) => (
	<Box
		sx={{
			'& img': {
				marginRight: '12px',
				width: size || '56px',
				height: size || '56px',
				objectFit: 'cover',
				borderRadius: '50%'
			}
		}}
	>
		{!src ? (
			<Avatar sx={{ bgcolor: 'grey', marginRight: '12px' }}>{name[0]}</Avatar>
		) : (
			<img src={src} alt="profile picture" />
		)}
	</Box>
)

export default CustomAvatar
