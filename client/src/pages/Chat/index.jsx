import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../store/thunks/usersThunk'
import { useEffect, useState } from 'react'
import Contacts from '../../components/Contacts'
import Messages from '../../components/Messages'
import FindContactModal from '../../components/FindContactModal'

const Chat = () => {
	const dispatch = useDispatch()
	const [modalOpen, setModalOpen] = useState(false)

	const handleToggleModal = () => setModalOpen(prev => !prev)

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
				background: '#000',
				maxWidth: '935px'
			}}
		>
			<Box sx={{ display: 'flex', height: '100%' }}>
				<Contacts handleToggleModal={handleToggleModal} />
				<Messages handleToggleModal={handleToggleModal} />
			</Box>
			<FindContactModal open={modalOpen} onClose={handleToggleModal} />
		</Box>
	)
}

export default Chat
