/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:46:48
 * @LastEditTime: 2023-01-12 14:46:23
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import SimpleResponsiveHeader from '@/components/Header/SimpleResponsiveHeader'
const links = [
	{ link: '/', label: 'Home' },
	{ link: '/admin', label: 'Dashboard' },
	{ link: '/about', label: 'About' }
]
const DefaultLayout2 = () => (
	<div className="w-full">
		<SimpleResponsiveHeader links={links} />
		{/* <h1 className="text-center">public layout</h1> */}
		<Outlet />
	</div>
)

export default DefaultLayout2
