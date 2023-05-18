import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from '../../api/users'

export const getUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetchUsers()
	return response.data
})
