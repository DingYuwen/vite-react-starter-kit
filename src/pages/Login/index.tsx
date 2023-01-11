/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:51:21
 * @LastEditTime: 2023-01-11 11:01:56
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '@/store/user'
import { parse, stringify } from 'qs'
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
		navigate(queryString ? (redirect + '?' + queryString) as string : redirect as string)
	}
	return (
		<div className="m-6">
			<button onClick={() => handleLogin()}>{loading ? '登录中...' : 'login'}</button>
		</div>
	)
}

export default Login
