/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:35:32
 * @LastEditTime: 2023-01-09 18:07:40
 * @LastEditors: dingyuwen
 * @Description:  
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import counterReducer from './counter'
import userReducer from './user'

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
})
const store = configureStore({
    reducer: rootReducer,
})

export default store