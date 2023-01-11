/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 18:56:45
 * @LastEditTime: 2023-01-10 18:56:59
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
