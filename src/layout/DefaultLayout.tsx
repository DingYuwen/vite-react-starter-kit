/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:47:08
 * @LastEditTime: 2023-01-11 19:09:25
 * @LastEditors: dingyuwen
 * @Description:
 */
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate, Link } from 'react-router-dom'
import { Avatar, Menu, Text, Button } from '@mantine/core'
import { logout } from '@/store/user'
import {
	IconLogout,
	IconSettings,
	IconSearch,
	IconLayoutDashboard,
	IconMessageCircle,
	IconTrash,
	IconArrowsLeftRight
} from '@tabler/icons'

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
			<div className="m-2 p-2 flex justify-between items-center">
				<h1 className="text-blue-600"> default layout </h1>
				<div className="flex justify-end">
					<Menu shadow="md" width={200}>
						<Menu.Target>
							<Avatar className="cursor-pointer" title={userInfo.name} color="cyan" radius="xl">
								{userInfo.name}
							</Avatar>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Label>Application</Menu.Label>
							<Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
								logout
							</Menu.Item>
							<Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
							<Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
							<Menu.Item icon={<IconLayoutDashboard size={14} />}>
								<Link to="/admin">Dashboard</Link>
							</Menu.Item>
							<Menu.Item
								icon={<IconSearch size={14} />}
								rightSection={
									<Text size="xs" color="dimmed">
										⌘K
									</Text>
								}
							>
								Search
							</Menu.Item>

							<Menu.Divider />

							<Menu.Label>Danger zone</Menu.Label>
							<Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
							<Menu.Item color="red" icon={<IconTrash size={14} />}>
								Delete my account
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</div>
			</div>

			<div className="container mx-auto px-4">
				<Outlet />
			</div>
		</div>
	)
}
export default DefaultLayout
