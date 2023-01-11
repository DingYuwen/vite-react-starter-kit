/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:46:48
 * @LastEditTime: 2023-01-11 16:23:49
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import SimpleHeader from '@/components/Header/SimpleHeader'
const links = [
	{link: '#', label: 'dyw1'},
	{link: '#', label: 'dyw2'},
	{link: '#', label: 'dyw3'},
]
const PublicLayout = () => (
	<div>
		<SimpleHeader links={links} />
		<h1>public layout</h1>
		<Outlet />
	</div>
)

export default PublicLayout
