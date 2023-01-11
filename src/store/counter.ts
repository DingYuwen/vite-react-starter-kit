/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:52:21
 * @LastEditTime: 2023-01-11 11:13:53
 * @LastEditors: dingyuwen
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		loading: false,
		count: 100
	},
	reducers: {
		increment: (state) => {
			state.count = state.count + 1
		},
		decrement: (state) => {
			state.count = state.count - 1
		},
		setLoading: (state, { payload }) => {
			state.loading = payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(decrementAsync.fulfilled, (state) => {
			state.count = state.count - 1
			state.loading = false
		})
	}
})

export const { increment, decrement, setLoading } = counterSlice.actions

export const decrementAsync = createAsyncThunk('counter/decrementAsync', async (time: number, { dispatch }) => {
	dispatch(setLoading(true))
	await new Promise<any>((resolve) => setTimeout(() => resolve(null), time))
	return null
})

export default counterSlice.reducer
