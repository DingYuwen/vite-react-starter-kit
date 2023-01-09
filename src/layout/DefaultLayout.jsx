/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:47:08
 * @LastEditTime: 2023-01-09 22:19:34
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
			<button onClick={handleLogout}>logout</button>
			<Outlet />
		</div>
	)
}
export default DefaultLayout
