import { createSlice } from '@reduxjs/toolkit'
import { getUsersByIdsThunk, getUsersThunk } from '../thunks/usersThunk'

const usersSlice = createSlice({
	name: 'user',
	initialState: {
		users: null,
		userChats: null,
		loading: false,
		error: null
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
			.addCase(getUsersByIdsThunk.pending, state => {
				state.loading = true
			})
			.addCase(getUsersByIdsThunk.fulfilled, (state, action) => {
				state.loading = false
				state.userChats = action.payload
			})
			.addCase(getUsersByIdsThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default usersSlice.reducer
