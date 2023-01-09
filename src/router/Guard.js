/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 16:00:06
 * @LastEditTime: 2023-01-09 18:22:37
 * @LastEditors: dingyuwen
 * @Description: 
 */
import { useLocation, Navigate } from 'react-router-dom'
import { getToken, isNullOrWhitespace } from '@/utils'
import qs from 'qs'
const WHITE_LIST = ['/login', '/404']

//全局路由守卫
const onRouteBefore = (meta, to, search) => {
    const { auth, title } = meta;
    if (title) {    // 动态修改页面title
        document.title = title || 'vite-react'
    }
    if(!auth || WHITE_LIST.includes(to)) return to

    const token = getToken()
    /** 没有token的情况 */
    if (isNullOrWhitespace(token)){
        const queryObj = qs.stringify({...qs.parse(search.slice(1)), redirect: to})
        console.log(search, queryObj)
        return '/login?' + queryObj
    } 
  
    /** 有token的情况 */
    if (to === '/login') return '/'

    return to
}

const Guard = ({ element, meta }) => {
    const { pathname, search } = useLocation()
    const nextPath = onRouteBefore(meta ,pathname, search);
    if (nextPath && nextPath !== pathname) {
        element = <Navigate to={nextPath} replace={true}/>
    }
    return element
}

export default Guard
