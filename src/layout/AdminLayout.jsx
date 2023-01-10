/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 09:56:04
 * @LastEditTime: 2023-01-10 09:56:13
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Outlet } from 'react-router-dom'
const AdminLayout = () => (
	<div>
		<h1>admin layout</h1>
		<Outlet />
	</div>
)

export default AdminLayout
