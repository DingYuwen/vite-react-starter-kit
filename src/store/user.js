/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 17:18:10
 * @LastEditTime: 2023-01-09 18:22:17
 * @LastEditors: dingyuwen
 * @Description: 
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { removeToken, setToken } from '@/utils'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userInfo: {},
        isLogin: false
    },
    reducers: {
        setUserInfo: (state, { payload }) => {
            state.userInfo =  {...state.userInfo, ...payload}
        },
        setIsLogin: (state, { payload }) => {
            state.isLogin = payload
        },
        setLoading: (state, { payload }) => {
            state.loading = payload
            setToken('dingyuwen')
        },
        logout: state => {
            state.isLogin = false
            state.userInfo = {}
            removeToken()
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.isLogin = true
            state.loading = false
            console.log(payload)
            state.userInfo =  {...state.userInfo, ...payload}
        })
    }
})

export const { setUserInfo, setIsLogin, setLoading, logout } = userSlice.actions

export const login = createAsyncThunk(
    'user/login',
    async (time = 1500, { dispatch }) => {
        dispatch(setLoading(true))
        return await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve({
                    name: 'dingyuwen'
                })
            }, time)
        })
    }
)

export default userSlice.reducer