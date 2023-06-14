import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers, getUsersByIds } from '../../api/users'

export const getUsersThunk = createAsyncThunk('users/getUsers', async (username, { rejectWithValue }) => {
	try {
		const response = await getUsers(username)
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})

export const getUsersByIdsThunk = createAsyncThunk('users/getUsersByIds', async (ids, { rejectWithValue }) => {
	try {
		const response = await getUsersByIds(ids)
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})
