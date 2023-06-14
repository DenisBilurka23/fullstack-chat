import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRoom, deleteRoom, getRoom, sendMessage } from '../../api/room'

const thunkCreator = (name, request) =>
	createAsyncThunk(`rooms/${name}`, async (payload, { rejectWithValue }) => {
		try {
			const response = await request(payload)
			return response.data
		} catch (e) {
			console.log('error: ', e)
			return rejectWithValue(e.response.data)
		}
	})

export const getRoomThunk = thunkCreator('getRoom', getRoom)
export const createRoomThunk = thunkCreator('createRoom', createRoom)
export const deleteRoomThunk = thunkCreator('deleteRoom', deleteRoom)
export const sendMessageThunk = thunkCreator('sendMessage', sendMessage)
