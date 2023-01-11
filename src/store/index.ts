/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:35:32
 * @LastEditTime: 2023-01-10 18:51:51
 * @LastEditors: dingyuwen
 * @Description:
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counter'
import userReducer from './user'

const rootReducer = combineReducers({
	counter: counterReducer,
	user: userReducer
})
const store = configureStore({
	reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
