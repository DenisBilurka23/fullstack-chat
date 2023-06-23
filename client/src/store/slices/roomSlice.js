import { createSlice } from '@reduxjs/toolkit'
import { createRoomThunk, deleteRoomThunk, getRoomThunk, sendMessageThunk } from '../thunks/roomThunk'

const roomSlice = createSlice({
	name: 'room',
	initialState: {
		loading: false,
		error: null,
		selectedRoom: null,
		totalPages: null,
		messages: []
	},
	reducers: {
		selectRoom: (state, action) => void (state.selectedRoom = action.payload),
		addMessage: (state, action) => void (state.messages = [...state.messages, action.payload]),
		resetMessages: state => void (state.messages = [])
	},
	extraReducers: builder => {
		builder
			.addCase(createRoomThunk.pending, state => {
				state.loading = true
			})
			.addCase(createRoomThunk.fulfilled, (state, action) => {
				state.loading = false
				state.selectedRoom = action.payload.room
			})
			.addCase(createRoomThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(getRoomThunk.pending, state => {
				state.loading = true
			})
			.addCase(getRoomThunk.fulfilled, (state, action) => {
				state.loading = false
				state.totalPages = action.payload.totalPages
				state.messages = [...action.payload.messages, ...state.messages]
			})
			.addCase(getRoomThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(deleteRoomThunk.pending, state => {
				state.loading = true
			})
			.addCase(deleteRoomThunk.fulfilled, state => {
				state.loading = false
			})
			.addCase(deleteRoomThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(sendMessageThunk.pending, state => {
				state.loading = true
			})
			.addCase(sendMessageThunk.fulfilled, (state, action) => {
				state.loading = false
				state.messages = [...state.messages, action.payload]
			})
			.addCase(sendMessageThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { selectRoom, addMessage, resetMessages } = roomSlice.actions

export default roomSlice.reducer
