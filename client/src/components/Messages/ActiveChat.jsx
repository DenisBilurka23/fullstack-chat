import { Box } from '@mui/material'
import ActiveChatTitle from './ActiveChatTitle'
import { useSelector } from 'react-redux'
import ActiveChatContent from './ActiveChatContent'
import ConfirmationModal from '../ConfirmModal'
import { useState } from 'react'

const mockMessages = [
	{ id: 1, text: 'fuck you', sender: 1 },
	{ id: 2, text: 'no fuck you leatherman', sender: 2 },
	{ id: 3, text: 'fisting is 300 hundred bucks', sender: 2 },
	{ id: 4, text: 'i rip the skin', sender: 1 },
	{ id: 5, text: 'gay bar', sender: 1 },
	{ id: 6, text: 'without further interaption, lets celebrate and suck some dick', sender: 3 }
]

const ActiveChat = ({ selectedChat }) => {
	const user = useSelector(state => state.users.user)
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

	const handleConfirmChatDeletion = () => {
		console.log('deleted')
	}

	const toggleConfirmationModal = () => setConfirmationModalOpen(prev => !prev)

	return (
		<Box height="100%" display="flex" flexDirection="column">
			<ActiveChatTitle toggleConfirmationModal={toggleConfirmationModal} recipient={selectedChat} />
			<ActiveChatContent user={user} recipient={selectedChat} messages={mockMessages} />
			<ConfirmationModal
				message="Are you sure you want to delete the chat?"
				onConfirm={handleConfirmChatDeletion}
				open={confirmationModalOpen}
				onClose={toggleConfirmationModal}
			/>
		</Box>
	)
}

export default ActiveChat
