import { Avatar, Box } from '@mui/material'

const CustomAvatar = ({ src, size, name, online }) => (
	<Box
		sx={{
			position: 'relative',
			'& img': {
				marginRight: '12px',
				width: size || '56px',
				height: size || '56px',
				objectFit: 'cover',
				borderRadius: '50%'
			},
			...(online && {
				'&:after': {
					content: '""',
					position: 'absolute',
					width: '10px',
					height: '10px',
					borderRadius: '50%',
					top: 0,
					right: '15px',
					background: '#00dc00'
				}
			})
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
