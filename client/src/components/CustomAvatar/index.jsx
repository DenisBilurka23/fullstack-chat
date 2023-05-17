import { Box } from '@mui/material'

const CustomAvatar = ({ src, size }) => (
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
		<img src={src} alt='profile picture' />
	</Box>
)

export default CustomAvatar
