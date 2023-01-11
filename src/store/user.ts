/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 17:18:10
 * @LastEditTime: 2023-01-11 11:11:29
 * @LastEditors: dingyuwen
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { removeToken, setToken } from '@/utils'

interface UserInfo {
	name?: string;
	[k: string]: any;
}
interface UserState {
	loading: boolean;
	isLogin: boolean;
	userInfo: UserInfo
}
const initialState: UserState = {
	loading: false,
	userInfo: {},
	isLogin: false
}
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfo: (state, { payload }) => {
			state.userInfo = { ...state.userInfo, ...payload }
		},
		setIsLogin: (state, action: PayloadAction<boolean>) => {
			state.isLogin = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
			setToken('dingyuwen')
		},
		logout: (state) => {
			state.isLogin = false
			state.userInfo = {}
			removeToken()
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.isLogin = true
			state.loading = false
			console.log(payload)
			state.userInfo = { ...state.userInfo, ...payload }
		})
	}
})

export const { setUserInfo, setIsLogin, setLoading, logout } = userSlice.actions

export const login = createAsyncThunk('user/login', async (time: number, thunkApi) => {
	thunkApi.dispatch(setLoading(true))
	return await new Promise<UserInfo>((resolve) => setTimeout(() => resolve({name: 'dingyuwen'}), time))
})

export default userSlice.reducer
