/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:47:08
 * @LastEditTime: 2023-01-12 14:20:52
 * @LastEditors: dingyuwen
 * @Description:
 */
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Title } from '@mantine/core'

const PublicLayout: FC = () => {
	return (
		<>
			<Title
				className="text-blue-600 m-6"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
			>
				PublicLayout
			</Title>
			<hr />
			<div className="container mx-auto px-4">
				<Outlet />
			</div>
		</>
	)
}
export default PublicLayout
