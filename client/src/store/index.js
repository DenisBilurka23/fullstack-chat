import { combineReducers, configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'
import authSlice from './slices/authSlice'
import roomSlice from './slices/roomSlice'
import { logger } from 'redux-logger/src'

const rootReducer = combineReducers({
	users: usersSlice,
	auth: authSlice,
	rooms: roomSlice
})

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export default store
