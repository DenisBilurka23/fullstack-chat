import { Box, Button, Typography } from '@mui/material'
import CustomAvatar from '../../components/CustomAvatar'
import { useSelector } from 'react-redux'

const Settings = () => {
	const { user } = useSelector(state => state.auth)
	const [changeUsernameActive, setChangeUsernameActive] = useState(false)

	const handleChangeUsername = setChangeUsernameActive(prev => !prev)

	return (
		<Box sx={{ background: '#121212' }} width="100%" display="flex" justifyContent="center">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					m: '20px',
					border: '1px solid rgb(38, 38, 38)',
					background: '#000',
					width: '100%',
					maxWidth: '935px'
				}}
			>
				{user && (
					<>
						<Box display="flex" alignItems="center" mt="60px">
							<CustomAvatar size="55px" name={user.username} src={user.profilePicture} />
							<Button variant="text" component="label">
								{`${user.profilePicture ? 'Change' : 'Add'} profile photo`}
								<input type="file" hidden />
							</Button>
						</Box>
						<Box
							sx={{
								margin: '-10px',
								display: 'flex',
								cursor: 'pointer',
								justifyContent: 'space-between'
							}}
							onClick={handleChangeUsername}
						>
							<Typography m="25px 10px" fontSize={20}>
								Username:
							</Typography>
							<Typography m="25px 10px" fontSize={20}>
								{user.username}
							</Typography>
						</Box>
					</>
				)}
			</Box>
		</Box>
	)
}

export default Settings
