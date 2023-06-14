import { Box } from '@mui/material'
import { useState } from 'react'
import Contacts from '../../components/Contacts'
import Messages from '../../components/Messages'
import FindContactModal from '../../components/FindContactModal'

const Chat = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const handleToggleModal = () => setModalOpen(prev => !prev)

	return (
		<Box sx={{ background: '#121212' }} width="100%" display="flex" justifyContent="center">
			<Box
				sx={{
					display: 'flex',
					m: '20px',
					border: '1px solid rgb(38, 38, 38)',
					background: '#000',
					width: '100%',
					maxWidth: '935px'
				}}
			>
				<Contacts handleToggleModal={handleToggleModal} />
				<Messages handleToggleModal={handleToggleModal} />
			</Box>
			<FindContactModal open={modalOpen} onClose={handleToggleModal} />
		</Box>
	)
}

export default Chat
