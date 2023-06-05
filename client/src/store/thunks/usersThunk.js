import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../../api/users'

export const getUsersThunk = createAsyncThunk('users/fetchUsers', async (username, { rejectWithValue }) => {
	try {
		const response = await getUsers(username)
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})
