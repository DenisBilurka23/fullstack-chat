import AuthForm from '../../components/AuthForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { signUpThunk } from '../../store/thunks/authThunk'
import Loader from '../../components/Loader'

const SignUp = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { loading, signUpSuccess, error } = useSelector(state => state.auth)
	const submitHandler = async () => {
		await dispatch(signUpThunk({ username, password }))
	}

	useEffect(() => {
		if (signUpSuccess) {
			navigate('/sign-in')
		}
	}, [signUpSuccess])

	return (
		<>
			<AuthForm
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				onSubmit={submitHandler}
				error={error}
				type="signup"
			/>
			{loading && <Loader />}
		</>
	)
}

export default SignUp
