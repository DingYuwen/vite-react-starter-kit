/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-12 14:58:33
 * @LastEditTime: 2023-01-12 16:08:44
 * @LastEditors: dingyuwen
 * @Description:
 */
import { UnstyledButton, UnstyledButtonProps, Group, Avatar, Text, createStyles } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { FC, forwardRef } from 'react'
const useStyles = createStyles((theme) => ({
	user: {
		display: 'block',
		width: '100%',
		padding: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
		}
	}
}))

interface UserButtonProps extends UnstyledButtonProps {
	image: string
	name: string
	email: string
	icon?: React.ReactNode
}

export const UserButton: FC<UserButtonProps> =
	// forwardRef(
	({ image, name, email, icon, ...others }) => {
		const { classes } = useStyles()

		return (
			<UnstyledButton className={classes.user} {...others}>
				<Group>
					<Avatar src={image} radius="xl" />

					<div style={{ flex: 1 }}>
						<Text size="sm" weight={500}>
							{name}
						</Text>

						<Text color="dimmed" size="xs">
							{email}
						</Text>
					</div>

					{icon || <IconChevronRight size={14} stroke={1.5} />}
				</Group>
			</UnstyledButton>
		)
	}
// )
