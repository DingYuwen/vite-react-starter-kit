/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-12 17:20:05
 * @LastEditTime: 2023-01-12 17:51:17
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles } from '@mantine/core'
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'

interface LinksGroupProps {
	icon: TablerIcon
	label: string
	initiallyOpened?: boolean
	link?: string
	links?: { label: string; link: string }[]
}

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black
		}
	},

	link: {
		cursor: 'pointer',
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		paddingLeft: 31,
		marginLeft: 30,
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black
		}
	},

	chevron: {
		transition: 'transform 200ms ease'
	}
}))
export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
	const { classes, theme } = useStyles()
	const hasLinks = Array.isArray(links)
	const navigate = useNavigate()
	const [opened, setOpened] = useState(initiallyOpened || false)
	const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft

	const items = (hasLinks ? links : []).map((link) => (
		<Text<'a'>
			component="a"
			className={classes.link}
			key={link.label}
			onClick={(event) => {
				event.preventDefault()
				navigate(link.link)
			}}
		>
			{link.label}
		</Text>
	))

	return (
		<>
			<UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
				<Group position="apart" spacing={0}>
					<Box
						sx={{ display: 'flex', alignItems: 'center' }}
						onClick={() => {
							!hasLinks && link && navigate(link)
						}}
					>
						<ThemeIcon variant="light" size={30}>
							<Icon size={18} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<ChevronIcon
							className={classes.chevron}
							size={14}
							stroke={1.5}
							style={{
								transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none'
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
		</>
	)
}
