/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 16:09:23
 * @LastEditTime: 2023-01-12 16:26:32
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import { createStyles, Header, Menu, Button, Group, Avatar, Text } from '@mantine/core'
import { IconLogout, IconMessageCircle, IconTrash, IconChevronDown, IconArrowsLeftRight } from '@tabler/icons'
import { UserButton } from '@/components/UserButton'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/user'
import { Logo } from '@/components/Logo'

const HEADER_HEIGHT = 60

export default function AdminHeader() {
	const { userInfo } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	return (
		<Header height={HEADER_HEIGHT}>
			<div className="flex justify-between h-[100%] items-center pr-6">
				<div className="flex w-[300px] h-full py-2 px-4">
					<Logo />
				</div>
				<Menu shadow="md" width={200} position="bottom-end" transition="pop-top-right">
					<Menu.Target>
						{/* <UserButton
							icon={<IconChevronDown />}
							image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
							name={userInfo.name}
							email="ding_yuwen@163.com"
						/> */}
						<Group className="cursor-pointer">
							<Avatar
								src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
								radius="xl"
							/>

							<div style={{ flex: 1 }}>
								<Text size="sm" weight={600}>
									{userInfo.name}
								</Text>

								<Text color="dimmed" size="xs">
									ding_yuwen@163.com
								</Text>
							</div>

							<IconChevronDown size={14} stroke={1.5} />
						</Group>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Label>Application</Menu.Label>
						<Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
							logout
						</Menu.Item>
						<Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>

						<Menu.Divider />

						<Menu.Label>Danger zone</Menu.Label>
						<Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
						<Menu.Item color="red" icon={<IconTrash size={14} />}>
							Delete my account
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</Header>
	)
}
