import { Box, Button, ClickAwayListener, TextField, Typography } from '@mui/material'
import CustomAvatar from '../../components/CustomAvatar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { refreshThunk, updateUserThunk } from '../../store/thunks/authThunk'
import DropDown from '../../components/DropDown'
import { resetErrors } from '../../store/slices/authSlice'

const Settings = () => {
	const [file, setFile] = useState()
	const profilePicturePreview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
	const { user, error } = useSelector(state => state.auth)
	const [username, setUsername] = useState('')
	const [changeUsernameActive, setChangeUsernameActive] = useState(false)
	const dispatch = useDispatch()

	const handleChangeUsername = () => {
		setChangeUsernameActive(prev => !prev)
		if (changeUsernameActive) {
			setUsername(user?.username)
		}
	}

	const handleUsernameChange = e => setUsername(e.target.value)

	const handleProfilePictureChange = e => setFile(e.target.files[0])

	const handleSubmit = async () => {
		const formData = new FormData()
		Object.entries({ username, file }).forEach(([key, value]) => formData.append(key, value))
		const actionResult = await dispatch(updateUserThunk({ id: user.id, payload: formData }))
		if (!actionResult.err) {
			dispatch(refreshThunk())
		}
	}

	useEffect(() => {
		setUsername(user?.username)
	}, [user?.username])

	useEffect(() => {
		dispatch(resetErrors())
	}, [])

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
					maxWidth: '935px',
					position: 'relative'
				}}
			>
				<Box sx={{ position: 'absolute', left: '1rem', top: '.5rem' }}>
					<DropDown />
				</Box>
				{user && (
					<>
						<Box display="flex" alignItems="center" mt="120px">
							<CustomAvatar
								size="55px"
								name={user.username}
								src={profilePicturePreview || user.profilePicture}
							/>
							<Button variant="text" component="label">
								{`${user.profilePicture ? 'Change' : 'Add'} profile photo`}
								<input type="file" hidden onChange={handleProfilePictureChange} />
							</Button>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
							{!changeUsernameActive ? (
								<>
									<Box
										sx={{
											margin: '1.5rem -10px -10px',
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
									{error?.errors.username && (
										<Typography
											sx={{ color: 'red' }}
										>{`Username min length is ${error?.errors.username.properties.minlength}`}</Typography>
									)}
								</>
							) : (
								<ClickAwayListener onClickAway={handleChangeUsername}>
									<TextField
										sx={{
											marginTop: '3rem',
											width: '230px',
											'& .MuiInputLabel-root': { color: 'grey !important' },
											'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
												borderColor: '#fff !important'
											},
											'& .MuiInputBase-input': { color: '#fff' }
										}}
										label="Username"
										variant="outlined"
										value={username}
										onChange={handleUsernameChange}
									/>
								</ClickAwayListener>
							)}
						</Box>
						<Button
							onClick={handleSubmit}
							variant="contained"
							sx={{ marginBottom: '1rem', width: '200px' }}
						>
							Save
						</Button>
					</>
				)}
			</Box>
		</Box>
	)
}

export default Settings
