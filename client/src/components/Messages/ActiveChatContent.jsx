import { Box, Button, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'

const Message = styled(Typography)(({ own }) => ({
	background: own ? '#262626' : 'none',
	border: own ? 'none' : '1px solid #262626',
	color: '#fff',
	alignSelf: own ? 'flex-end' : 'flex-start',
	padding: '10px 15px',
	borderRadius: '25px',
	marginBottom: '8px'
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

const ActiveChatContent = ({ user, messages }) => {
	const [inputValue, setInputValue] = useState('')
	const handleInputChange = e => setInputValue(e.target.value)

	const submitMessageHandle = () => {
		console.log('message: ', inputValue)
	}

	const handleKeyDown = event => {
		if (event.key === 'Enter' && inputValue.length > 0) {
			submitMessageHandle()
		}
	}

	return (
		<Box onKeyDown={handleKeyDown} p="20px" display="flex" flexGrow={1} flexDirection="column">
			<Box display="flex" flexDirection="column" flexGrow={1}>
				{messages.map(({ id, sender, text }) => (
					<Message key={id} own={sender === user.id ? 1 : 0}>
						{text}
					</Message>
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
