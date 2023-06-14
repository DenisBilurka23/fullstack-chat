import { Box } from '@mui/material'
import ActiveChatTitle from './ActiveChatTitle'
import { useDispatch, useSelector } from 'react-redux'
import ActiveChatContent from './ActiveChatContent'
import ConfirmationModal from '../ConfirmModal'
import { useEffect, useState } from 'react'
import { deleteRoomThunk, getRoomThunk } from '../../store/thunks/roomThunk'
import { refreshThunk } from '../../store/thunks/authThunk'

const ActiveChat = ({ recipient, selectedRoom }) => {
	const { user } = useSelector(state => state.auth)
	const { roomData } = useSelector(state => state.rooms)
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
	const dispatch = useDispatch()

	const handleConfirmChatDeletion = async () => {
		const actionResult = await dispatch(
			deleteRoomThunk({
				roomId: selectedRoom.roomId,
				recipientId: recipient.id,
				userId: user.id
			})
		)
		if (!actionResult.error) {
			dispatch(refreshThunk())
		}
	}

	const toggleConfirmationModal = () => setConfirmationModalOpen(prev => !prev)

	useEffect(() => {
		if (selectedRoom) {
			dispatch(getRoomThunk(selectedRoom.roomId))
		}
	}, [selectedRoom])

	return (
		<Box height="100%" display="flex" flexDirection="column">
			<ActiveChatTitle toggleConfirmationModal={toggleConfirmationModal} recipient={recipient} />
			<ActiveChatContent user={user} data={roomData} />
			<ConfirmationModal
				message="Are you sure you want to delete the chat? It will be deleted for both chat members"
				onConfirm={handleConfirmChatDeletion}
				open={confirmationModalOpen}
				onClose={toggleConfirmationModal}
			/>
		</Box>
	)
}

export default ActiveChat
