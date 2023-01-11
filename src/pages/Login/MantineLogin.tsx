/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-11 18:18:41
 * @LastEditTime: 2023-01-11 18:37:00
 * @LastEditors: dingyuwen
 * @Description:
 */
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '@/store/user'
import { parse, stringify } from 'qs'

export default function AuthenticationTitle() {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.user)
	const { search } = useLocation()
	const navigate = useNavigate()
	const queryObj = search ? parse(search.slice(1)) : {}
	const { redirect = '/', ...otherQuery } = queryObj
	const queryString = stringify(otherQuery)
	const handleLogin = async () => {
		await dispatch(login(1500))
		navigate(queryString ? ((redirect + '?' + queryString) as string) : (redirect as string))
	}
	return (
		<Container size={420} my={40}>
			<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
				Welcome back!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{' '}
				<Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
					Create account
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput label="Email" placeholder="you@mantine.dev" required />
				<PasswordInput label="Password" placeholder="Your password" required mt="md" />
				<Group position="apart" mt="lg">
					<Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
					<Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
						Forgot password?
					</Anchor>
				</Group>
				<Button loading={loading} fullWidth mt="xl" onClick={() => handleLogin()}>
					Sign in
				</Button>
			</Paper>
		</Container>
	)
}
