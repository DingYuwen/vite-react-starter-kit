/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:51:21
 * @LastEditTime: 2023-01-09 23:54:10
 * @LastEditors: dingyuwen ding_yuwen@163.com
 * @Description:
 */
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '@/store/user'
import { parse, stringify } from 'qs'
const Login = () => {
	const dispatch = useDispatch()
	const { loading } = useSelector((state) => state.user)
	const { search } = useLocation()
	const navigate = useNavigate()
	const queryObj = search ? parse(search.slice(1)) : {}
	const { redirect = '/', ...otherQuery } = queryObj
	const queryString = stringify(otherQuery)
	const handleLogin = async () => {
		await dispatch(login())
		navigate(queryString ? redirect + '?' + queryString : redirect)
	}
	return (
		<div className="m-6">
			<button onClick={() => handleLogin()}>{loading ? '登录中...' : 'login'}</button>
		</div>
	)
}

export default Login
