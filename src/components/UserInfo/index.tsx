/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 10:10:29
 * @LastEditTime: 2023-01-10 10:13:41
 * @LastEditors: dingyuwen
 * @Description:
 */

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/user'
const UserInfo = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { userInfo } = useAppSelector((state) => state.user)
	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}
	return (
		<div>
			{userInfo.name} <button onClick={handleLogout}>logout</button>
		</div>
	)
}
export default UserInfo
