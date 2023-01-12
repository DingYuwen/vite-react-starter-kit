/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 16:09:23
 * @LastEditTime: 2023-01-12 14:49:28
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import {
	ThemeIcon,
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
	Avatar,
	Menu,
	Text,
	UnstyledButton
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconBackhoe,
	IconLogout,
	IconSettings,
	IconSearch,
	IconLayoutDashboard,
	IconMessageCircle,
	IconTrash,
	IconArrowsLeftRight,
	IconChevronDown
} from '@tabler/icons'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '@/store/user'

const HEADER_HEIGHT = 80

const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		zIndex: 1
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none'
		}
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%'
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none'
		}
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none'
		}
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md
		}
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
		}
	},

	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[1]
		},

		[theme.fn.smallerThan('xs')]: {
			display: 'none'
		}
	},

	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[1]
	}
}))

interface HeaderSimpleProps {
	links: { link: string; label: string }[]
}

export default function SimpleResponsiveHeader({ links }: HeaderSimpleProps) {
	const [opened, { toggle, close }] = useDisclosure(false)
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const { userInfo } = useAppSelector((state) => state.user)
	const [active, setActive] = useState(links[0].link)
	const { classes, cx } = useStyles()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const items = links.map((link) => (
		<Link
			onClick={() => {
				setActive(link.link)
			}}
			key={link.label}
			className={cx(classes.link, { [classes.linkActive]: active === link.link })}
			to={link.link}
		>
			{link.label}
		</Link>
	))

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	return (
		<Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
			<Container className={classes.header}>
				<ThemeIcon radius="xl" size="lg">
					<IconBackhoe size={20} />
				</ThemeIcon>

				<Group spacing={5} className={classes.links}>
					{items}
				</Group>

				<Menu
					shadow="md"
					width={200}
					position="bottom-end"
					transition="pop-top-right"
					onClose={() => setUserMenuOpened(false)}
					onOpen={() => setUserMenuOpened(true)}
				>
					<Menu.Target>
						<UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
							<Group spacing={7} align="center">
								<Avatar src={userInfo.image} alt={userInfo.name} radius="xl" size={20} />
								<Text weight={500} size="sm" sx={{ lineHeight: 1, color: '#228be6' }} mr={3}>
									{userInfo.name}
								</Text>
								<IconChevronDown size={12} stroke={1.5} />
							</Group>
						</UnstyledButton>
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

				<Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							{items}
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	)
}
