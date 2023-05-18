import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../thunks/usersThunk'

const mockUsers = [
	{
		id: 1,
		name: 'Billy',
		img: 'https://m.media-amazon.com/images/M/MV5BZGRjZTczNWItMDk3NS00YmI0LTlmOTktYTQ4ZWQ1MzI1NmRhXkEyXkFqcGdeQXVyMzI5NDcxNzI@._V1_.jpg'
	},
	{
		id: 2,
		name: 'Van',
		img: 'data:image/jpeg;base64,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'
	},
	{
		id: 3,
		name: 'Brad',
		img: 'data:image/jpeg;base64,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'
	},
	{
		id: 4,
		name: 'Steve',
		img: 'data:image/jpeg;base64,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'
	}
]

const usersSlice = createSlice({
	name: 'user',
	initialState: {
		users: mockUsers,
		user: {
			id: 1,
			name: 'Jared',
			rooms: mockUsers
		},
		loading: false,
		error: null,
		selectedChat: null,
		test: 1
	},
	reducers: {
		selectChat: (state, action) => void (state.selectedChat = action.payload)
	},
	extraReducers: builder => {
		builder
			.addCase(getUsers.pending, state => {
				state.loading = true
			})
			.addCase(getUsers.fulfilled, state => {
				state.loading = true
				// state.users = action.payload
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = true
				state.error = action.error.message
			})
	}
})

export const { selectChat } = usersSlice.actions
export default usersSlice.reducer
