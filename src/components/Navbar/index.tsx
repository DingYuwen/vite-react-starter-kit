/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-12 14:59:54
 * @LastEditTime: 2023-01-12 17:50:08
 * @LastEditors: dingyuwen
 * @Description:
 */
import { createStyles, Navbar, ScrollArea } from '@mantine/core'
import { IconGauge, IconAdjustments, IconLock } from '@tabler/icons'
import { LinksGroup } from './LinksGroup'

const adminMockData = [
	{ label: 'Dashboard', icon: IconGauge, link: '/admin' },
	{
		label: 'Security',
		icon: IconLock,
		links: [
			{ label: 'Enable 2FA', link: '/' },
			{ label: 'Change password', link: '/' },
			{ label: 'Recovery codes', link: '/' }
		]
	},
	{ label: 'Settings', icon: IconAdjustments, link: '/Settings' }
]

const useAdminStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0
	},

	header: {
		padding: theme.spacing.md,
		paddingTop: 0,
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
	},

	links: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md
	},

	linksInner: {
		// paddingTop: theme.spacing.xl,
		// paddingBottom: theme.spacing.xl
	}
}))

export default function AdminNavbar() {
	const { classes } = useAdminStyles()
	const links = adminMockData.map((item) => <LinksGroup {...item} key={item.label} />)

	return (
		<Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
			<Navbar.Section grow className={classes.links} component={ScrollArea}>
				<div className={classes.linksInner}>{links}</div>
			</Navbar.Section>
		</Navbar>
	)
}
