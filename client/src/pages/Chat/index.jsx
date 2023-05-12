import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../store/slices/usersSlice'
import { getUsers } from '../../store/thunks/usersThunk'
import { useEffect } from 'react'
import Contacts from '../../components/Contacts'

const Chat = () => {
	const dispatch = useDispatch()
	const { users } = useSelector(state => state)

	useEffect(() => {
		dispatch(getUsers())
	}, [])

	return (
		<Box
			sx={{
				flexDirection: 'column',
				flexGrow: 1,
				m: '20px',
				border: '1px solid rgb(38, 38, 38)',
				background: '#000'
			}}
		>
			<Box>
				<Contacts />
			</Box>
			{/*{users.test}*/}
			{/*<Button onClick={() => dispatch(increment())}>increase</Button>*/}
		</Box>
	)
}

export default Chat
