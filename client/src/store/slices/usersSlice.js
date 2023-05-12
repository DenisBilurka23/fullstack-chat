import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../thunks/usersThunk'

const usersSlice = createSlice({
	name: 'user',
	initialState: {
		users: null,
		user: null,
		loading: false,
		error: null,
		test: 1
	},
	reducers: {
		increment: state => void (state.test += 1)
	},
	extraReducers: builder => {
		builder
			.addCase(getUsers.pending, state => {
				state.loading = true
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = true
				state.users = action.payload
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = true
				state.error = action.error.message
			})
	}
})

export const { increment } = usersSlice.actions
export default usersSlice.reducer
