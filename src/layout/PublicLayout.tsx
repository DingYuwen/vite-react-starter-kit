/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:46:48
 * @LastEditTime: 2023-01-11 17:47:33
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import SimpleResponsiveHeader from '@/components/Header/SimpleResponsiveHeader'
const links = [
	{ link: '/dyw1', label: 'dyw1' },
	{ link: '/dyw2', label: 'dyw2' },
	{ link: '/dyw3', label: 'dyw3' }
]
const PublicLayout = () => (
	<div className="w-full">
		<SimpleResponsiveHeader links={links} />
		{/* <h1 className="text-center">public layout</h1> */}
		<Outlet />
	</div>
)

export default PublicLayout
