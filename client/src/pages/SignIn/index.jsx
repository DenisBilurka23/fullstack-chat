import AuthForm from '../../components/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { signInThunk } from '../../store/thunks/authThunk'
import { useNavigate } from 'react-router-dom'
import { resetSignUpSuccess } from '../../store/slices/authSlice'
import { Alert, Slide } from '@mui/material'
import Loader from '../../components/Loader'

const SignIn = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { user, signUpSuccess, loading, error } = useSelector(state => state.auth)
	const submitHandler = async () => dispatch(signInThunk({ username, password }))

	useEffect(() => {
		if (signUpSuccess) {
			setTimeout(() => {
				dispatch(resetSignUpSuccess())
			}, 5000)
		}
	}, [signUpSuccess])

	useEffect(() => {
		if (user && !loading) {
			navigate('/')
		}
	}, [user, loading])

	return (
		<>
			<AuthForm
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				onSubmit={submitHandler}
				error={error}
				type="signin"
			/>
			<Slide direction="up" in={signUpSuccess}>
				<Alert
					severity="success"
					sx={{ position: 'absolute', bottom: 0, justifyContent: 'center', width: '100%' }}
				>
					User was successfully created!
				</Alert>
			</Slide>
			{loading && <Loader />}
		</>
	)
}

export default SignIn
