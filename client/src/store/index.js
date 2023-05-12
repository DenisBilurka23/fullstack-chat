import { combineReducers, configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'

const rootReducer = combineReducers({
	users: usersSlice
})

const store = configureStore({
	reducer: rootReducer
})

export default store
