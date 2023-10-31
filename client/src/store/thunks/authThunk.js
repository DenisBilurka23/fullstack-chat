import { createAsyncThunk } from '@reduxjs/toolkit'
import { refresh, signIn, signOut, signUp } from '../../api/auth'
import { userDto } from '../../utils/dtos'
import { updateUser } from '../../api/users'

export const signInThunk = createAsyncThunk('auth/signIn', async (payload, { rejectWithValue }) => {
	try {
		const response = await signIn(payload)
		localStorage.setItem('token', response.data.accessToken)
		return userDto(response.data)
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})

export const signUpThunk = createAsyncThunk('auth/signUp', async (payload, { rejectWithValue }) => {
	try {
		const response = await signUp(payload)
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})

export const signOutThunk = createAsyncThunk('auth/signOut', async (_, rejectWithValue) => {
	try {
		const response = await signOut()
		localStorage.removeItem('token')
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})

export const refreshThunk = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
	const token = localStorage.getItem('token')
	if (token) {
		try {
			const response = await refresh()
			localStorage.setItem('token', response.data.accessToken)
			console.log('response.data: ', response.data)
			return userDto(response.data)
		} catch (e) {
			console.log('error: ', e)
			return rejectWithValue(e.response.data)
		}
	}
})

export const updateUserThunk = createAsyncThunk('auth/updateUser', async ({ id, payload }, { rejectWithValue }) => {
	try {
		const response = await updateUser(id, payload)
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})
