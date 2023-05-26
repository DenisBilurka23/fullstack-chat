import { Box, Button, TextField, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

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
const AuthForm = ({ type }) => {
	const signinPage = type === 'signin'

	const handleSubmitForm = () => {
		if (signinPage) {
			console.log('signed in')
		}
	}

	return (
		<Form>
			<img src={logo} alt="logo" />
			<TextField variant="outlined" sx={{ width: '250px', marginBottom: '10px' }} placeholder="Username" />
			<TextField
				variant="outlined"
				sx={{ width: '250px', marginBottom: '10px' }}
				type="password"
				placeholder="Password"
			/>
			<Button
				fullWidth
				onClick={handleSubmitForm}
				sx={{ borderRadius: '20px', margin: '20px 0', width: '250px' }}
				variant="contained"
			>
				{signinPage ? 'Log in' : 'Sign up'}
			</Button>
			<Box display="flex">
				<Typography color="#000" fontSize="14px">
					{signinPage ? `Don't have an account yet?${''}` : 'Already have an account?'}
				</Typography>
				{signinPage ? <Link to="/sign-up">Sign up</Link> : <Link to="/sign-in">Sign In</Link>}
			</Box>
		</Form>
	)
}

export default AuthForm
