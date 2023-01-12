/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 09:56:04
 * @LastEditTime: 2023-01-12 17:13:16
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import AdminNavbar from '@/components/Navbar'
import AdminHeader from '@/components/Header/AdminHeader'

const AdminLayout = () => (
	<AppShell
		padding="md"
		navbar={<AdminNavbar />}
		header={<AdminHeader />}
		styles={(theme) => ({
			main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
		})}
	>
		<Outlet />
	</AppShell>
)

export default AdminLayout
