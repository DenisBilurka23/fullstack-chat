import { createSlice } from '@reduxjs/toolkit'
import { getUsersThunk } from '../thunks/usersThunk'

const usersSlice = createSlice({
	name: 'user',
	initialState: {
		users: null,
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
			.addCase(getUsersThunk.pending, state => {
				state.loading = true
			})
			.addCase(getUsersThunk.fulfilled, (state, action) => {
				state.loading = false
				state.users = action.payload
			})
			.addCase(getUsersThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { selectChat } = usersSlice.actions
export default usersSlice.reducer
