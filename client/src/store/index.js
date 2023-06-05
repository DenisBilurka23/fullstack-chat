import { combineReducers, configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'
import authSlice from './slices/authSlice'

const rootReducer = combineReducers({
	users: usersSlice,
	auth: authSlice
})

const store = configureStore({
	reducer: rootReducer
})

export default store
