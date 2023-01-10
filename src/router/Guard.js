/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 16:00:06
 * @LastEditTime: 2023-01-10 12:21:25
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useMemo, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getToken, isNullOrWhitespace } from '@/utils'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/user'
import { useEffect } from 'react'
const WHITE_LIST = ['/login', '/404']

//全局路由守卫

const Guard = ({ element, meta }) => {
	const { auth, title } = meta
	const dispatch = useDispatch()
	const { pathname: to, search } = useLocation()
	const { isLogin, userInfo } = useSelector((state) => state.user)

	const [token, setToken] = useState(getToken())

	const nextPath = useMemo(() => {
		if (!auth || WHITE_LIST.includes(to)) return to

		const queryObj = qs.stringify({ ...qs.parse(search.slice(1)), redirect: to })
		/** 没有token的情况 */
		if (isNullOrWhitespace(token)) {
			return '/login?' + queryObj
		}

		if (to === '/login') return '/'
		return to
	}, [auth, to, search, token])

	useEffect(() => {
		console.log('Guard useEffect nextPath: ', nextPath, isLogin)
		/** 有token的情况 */
		// todo: 校验token，失效则需要重新登录
		// await checkToken
		getToken() && setToken(getToken())
		if (token && !isLogin && nextPath.indexOf('/login' === -1)) {
			// 暂时手动更新userInfo，之后应该在dispatch(checkToken())成功时更新
			dispatch(setUserInfo({ name: 'dingyuwen' }))
		}
	}, [token, nextPath, isLogin])
	// todo: 如果已经登录则判断用户是否有改路由的权限，目前已登录视为有所有页面权限
	if (isLogin && userInfo.name) return element
	if (nextPath && nextPath !== to) {
		if (title) {
			// 动态修改页面title
			document.title = title || 'vite-react'
		}
		element = <Navigate to={nextPath} replace={true} />
	}
	return element
}

export default Guard
