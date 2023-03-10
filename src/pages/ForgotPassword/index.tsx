/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-12 18:16:44
 * @LastEditTime: 2023-01-12 18:22:37
 * @LastEditors: dingyuwen
 * @Description:
 */
import {
	createStyles,
	Paper,
	Title,
	Text,
	TextInput,
	Button,
	Container,
	Group,
	Anchor,
	Center,
	Box
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
	title: {
		fontSize: 26,
		fontWeight: 900,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`
	},

	controls: {
		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column-reverse'
		}
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			width: '100%',
			textAlign: 'center'
		}
	}
}))

export default function ForgotPassword() {
	const { classes } = useStyles()
	const navigate = useNavigate()
	return (
		<Container size={460} my={30}>
			<Title className={classes.title} align="center">
				Forgot your password?
			</Title>
			<Text color="dimmed" size="sm" align="center">
				Enter your email to get a reset link
			</Text>

			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<TextInput label="Your email" placeholder="me@mantine.dev" required />
				<Group position="apart" mt="lg" className={classes.controls}>
					<Anchor
						onClick={(event) => {
							event.preventDefault()
							navigate('/login')
						}}
						color="dimmed"
						size="sm"
						className={classes.control}
					>
						<Center inline>
							<IconArrowLeft size={12} stroke={1.5} />
							<Box ml={5}>Back to login page</Box>
						</Center>
					</Anchor>
					<Button className={classes.control}>Reset password</Button>
				</Group>
			</Paper>
		</Container>
	)
}
