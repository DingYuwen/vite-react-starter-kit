/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:47:08
 * @LastEditTime: 2023-01-11 17:46:19
 * @LastEditors: dingyuwen
 * @Description:
 */
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'

import { logout } from '@/store/user'
const DefaultLayout: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { userInfo } = useAppSelector((state) => state.user)
	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}
	return (
		<div className="text-center">
			<h1> default layout </h1>
			<span> user: {userInfo.name} </span>
			<button
				onClick={handleLogout}
				type="button"
				className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
			>
				logout
			</button>
			<div className="container mx-auto px-4">
				<Outlet />
			</div>
		</div>
	)
}
export default DefaultLayout
