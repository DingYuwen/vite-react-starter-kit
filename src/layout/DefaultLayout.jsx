/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:47:08
 * @LastEditTime: 2023-01-10 00:02:14
 * @LastEditors: dingyuwen ding_yuwen@163.com
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '@/store/user'
const DefaultLayout = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { userInfo } = useSelector((state) => state.user)
	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}
	return (
		<div>
			<h1> default layout </h1>
			<span> user: {userInfo.name} </span>
			<button
				onClick={handleLogout}
				type="button"
				className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
			>
				logout
			</button>
			<div className="card container mx-auto px-4">
				<Outlet />
			</div>
		</div>
	)
}
export default DefaultLayout
