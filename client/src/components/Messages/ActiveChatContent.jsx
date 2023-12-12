import { Box, Button, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useContext, useEffect, useRef, useState } from 'react'
import { getRoomThunk, sendMessageThunk } from '../../store/thunks/roomThunk'
import { useDispatch, useSelector } from 'react-redux'
import SocketContext from '../../socket'
import moment from 'moment'
import { addMessage, resetMessages } from '../../store/slices/roomSlice'

const Message = styled(Typography)(({ own }) => ({
	background: own ? '#262626' : 'none',
	border: own ? 'none' : '1px solid #262626',
	color: '#fff',
	padding: '10px 15px',
	borderRadius: '25px',
	alignSelf: 'center',
	overflowWrap: 'anywhere'
}))

const TextFieldStyled = styled(TextField)({
	input: { color: '#fff', fontSize: '14px' },
	'& .MuiOutlinedInput-root': {
		border: '1px solid #262626',
		borderRadius: '25px',
		paddingRight: '75px',
		'&.Mui-focused fieldset': {
			border: 'none'
		}
	}
})

const Submit = styled(Button)({
	position: 'absolute',
	right: '10px',
	top: '50%',
	transform: 'translateY(-50%)',
	borderRadius: '25px'
})

const ActiveChatContent = ({ user, recipientId }) => {
	const socket = useContext(SocketContext)
	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()
	const messageRef = useRef(null)
	const messagesContainerRef = useRef(null)
	const { selectedRoom, messages, totalPages, loading } = useSelector(state => state.rooms)
	const [currentPage, setCurrentPage] = useState(1)
	const messagesPerPage = 10

	const handleInputChange = e => setInputValue(e.target.value)

	const submitMessageHandle = async () => {
		socket.emit('sendMessage', user?.id, recipientId, inputValue)
		await dispatch(sendMessageThunk({ roomId: selectedRoom.roomId, sender: user?.id, text: inputValue }))
		messageRef.current?.scrollIntoView({ behavior: 'smooth' })
		setInputValue('')
	}

	const handleKeyDown = event => {
		if (event.key === 'Enter' && inputValue.length > 0) {
			submitMessageHandle()
		}
	}

	const scrollHandler = event => {
		const { scrollTop } = event.target
		if (scrollTop === 0) {
			setCurrentPage(prevPage => prevPage + 1)
		}
	}

	useEffect(() => {
		dispatch(resetMessages())
	}, [selectedRoom.roomId])

	useEffect(() => {
		if (selectedRoom && !loading && (totalPages >= currentPage || !totalPages)) {
			const getRoom = async () => {
				const prevScrollHeight = messagesContainerRef.current.scrollHeight
				await dispatch(
					getRoomThunk({
						roomId: selectedRoom.roomId,
						page: currentPage,
						messagesPerPage
					})
				)
				const newScrollHeight = messagesContainerRef.current.scrollHeight
				const scrollOffset = newScrollHeight - prevScrollHeight
				messagesContainerRef.current.scrollTop += scrollOffset
			}
			getRoom()
		}
	}, [currentPage, selectedRoom])

	useEffect(() => {
		socket.on('getMessage', async message => {
			await dispatch(addMessage(message))
			messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
		})
		messagesContainerRef.current?.addEventListener('scroll', scrollHandler)

		return () => {
			messagesContainerRef.current?.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<Box onKeyDown={handleKeyDown} p="20px" display="flex" flexGrow={1} flexDirection="column" overflow="hidden">
			<Box ref={messagesContainerRef} display="flex" flexDirection="column" flexGrow={1} overflow="scroll">
				{messages?.map(({ _id, sender, text, createdAt }, index) => (
					<Box
						ref={index === messages.length - 1 ? messageRef : null}
						key={_id}
						sx={{
							alignSelf: sender === user?.id ? 'flex-end' : 'flex-start',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<Message own={sender === user?.id ? 1 : 0}>{text}</Message>
						{createdAt && (
							<Typography
								sx={{
									margin: '4px 15px',
									color: 'rgb(168, 168, 168)',
									fontSize: '12px',
									textAlign: sender === user?.id ? 'end' : 'start',
									alignSelf: sender === user?.id ? 'flex-end' : 'flex-start'
								}}
							>
								{moment(createdAt).fromNow()}
							</Typography>
						)}
					</Box>
				))}
			</Box>
			<Box position="relative">
				<TextFieldStyled
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Message..."
					fullWidth
					variant="outlined"
				/>
				<Submit onClick={submitMessageHandle} disabled={inputValue.length === 0}>
					Send
				</Submit>
			</Box>
		</Box>
	)
}

export default ActiveChatContent
