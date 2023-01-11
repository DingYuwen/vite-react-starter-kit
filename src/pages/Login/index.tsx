/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:51:21
 * @LastEditTime: 2023-01-11 17:53:22
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '@/store/user'
import { parse, stringify } from 'qs'
import ForgotPasswordInput from '@/components/Common/ForgotPasswordInput'
import { TextInput, createStyles } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
	invalid: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0]
	},

	icon: {
		color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6]
	}
}))

const Login = () => {
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
	const { classes } = useStyles()
	return (
		<div className="m-6 flex flex-col items-center gap-4">
			<h1>Login</h1>
			<div className="min-w-[380px] flex flex-col gap-4">
				<TextInput
					label="email"
					error="Invalid email"
					classNames={{ input: classes.invalid }}
					rightSection={<IconAlertTriangle stroke={1.5} size={16} className={classes.icon} />}
				/>
				<ForgotPasswordInput />
			</div>
			<button onClick={() => handleLogin()}>{loading ? '登录中...' : 'login'}</button>
		</div>
	)
}

export default Login
