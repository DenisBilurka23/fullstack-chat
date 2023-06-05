import { Box, Button, TextField, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { resetErrors } from '../../store/slices/authSlice'

const Form = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '45px',
	padding: '0 45px 45px',
	border: '1px solid #e4e4e4',
	height: 'fit-content',
	input: {
		padding: '5px 10px'
	},
	'& .Mui-focused fieldset': {
		outline: 'none',
		border: '1px solid #7d7d7d!important'
	},
	'& img': {
		width: '200px',
		margin: '45px 0 45px 0'
	},
	a: {
		color: '#3c95ef',
		fontSize: '14px',
		fontWeight: 700,
		underline: 'none',
		marginLeft: '5px'
	}
})
const AuthForm = ({ type, username, setUsername, password, setPassword, onSubmit, error }) => {
	const signinPage = type === 'signin'
	const dispatch = useDispatch()

	const parsedErrors = useMemo(() => {
		if (error) {
			console.log('error: ', error)
			return 'errors' in error ? error.errors.map(({ msg }) => msg) : [error.error]
		}
	}, [error])

	const handleUsernameChange = e => setUsername(e.target.value)

	const handlePasswordChange = e => setPassword(e.target.value)

	useEffect(() => {
		dispatch(resetErrors())
	}, [])

	return (
		<>
			<Form>
				<img src={logo} alt="logo" />
				<TextField
					value={username}
					onChange={handleUsernameChange}
					variant="outlined"
					sx={{ width: '250px', marginBottom: '10px' }}
					placeholder="Username"
				/>
				<TextField
					value={password}
					onChange={handlePasswordChange}
					variant="outlined"
					sx={{ width: '250px', marginBottom: '10px' }}
					type="password"
					placeholder="Password"
				/>
				<Button
					fullWidth
					onClick={onSubmit}
					sx={{ borderRadius: '20px', margin: '20px 0', width: '250px' }}
					disabled={!username.length || !password.length}
					variant="contained"
				>
					{signinPage ? 'Log in' : 'Sign up'}
				</Button>
				{parsedErrors?.map(error => (
					<Typography mb="20px" textAlign="center" maxWidth="250px" color="rgb(237, 73, 86)" key={error}>
						{error}
					</Typography>
				))}

				<Box display="flex">
					<Typography color="#000" fontSize="14px">
						{signinPage ? `Don't have an account yet?${''}` : 'Already have an account?'}
					</Typography>
					{signinPage ? <Link to="/sign-up">Sign up</Link> : <Link to="/sign-in">Sign In</Link>}
				</Box>
			</Form>
		</>
	)
}

export default AuthForm
