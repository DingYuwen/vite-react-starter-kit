/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:49:32
 * @LastEditTime: 2023-01-11 15:24:59
 * @LastEditors: dingyuwen
 * @Description:
 */
import { lazy, FC, ReactNode } from 'react'
import DefaultLayout from '@/layout/DefaultLayout'
import PublicLayout from '@/layout/PublicLayout'
import AdminLayout from '@/layout/AdminLayout'
import { Navigate, RouteObject } from 'react-router-dom'
import Guard from './Guard'
import LazyElement from './LazyElement'
import { useRoutes } from 'react-router-dom'

const Login = lazy(() => import('@/pages/Login'))
const Admin = lazy(() => import('@/pages/Admin'))
const Dashboard = lazy(() => import('@/pages/Home/Dashboard'))
const Home = lazy(() => import('@/pages/Home'))

export interface RouteMeta {
	auth?: boolean
	title?: string
	useLayoutGuard?: boolean
	useRouteGuard?: boolean
	[k: string]: any
}

export interface RouteObj {
	path: string
	component?: ReactNode;
	redirect?: string
	meta?: RouteMeta
	children?: RouteObj[]
}

const routesList: RouteObj[] = [
	{
		path: '',
		component: <DefaultLayout />,
		meta: {
			auth: true,
			useLayoutGuard: true
		},
		children: [
			{
				path: '',
				component: <Home />,
				meta: {
					title: '首页',
					auth: true
				}
			},
			{
				path: 'dashboard',
				component: <Dashboard />,
				meta: {
					title: '工作台',
					auth: true
				}
			}
		]
	},
	{
		path: '',
		component: <PublicLayout />,
		meta: {
			useLayoutGuard: false
		},
		children: [
			{
				path: 'login',
				component: <Login />,
				meta: {
					title: '登录'
				}
			}
		]
	},
	{
		path: '/admin',
		component: <AdminLayout />,
		meta: {
			useLayoutGuard: true,
			auth: true
		},
		children: [
			{
				path: '',
				component: <Admin />,
				meta: {
					title: '控制台',
					auth: true
				}
			}
		]
	}
]

// 使用layout守卫或者路由守卫
function transRoutes(routes: RouteObj[]) {
	const list: RouteObject[] = []
	routes.forEach((route) => {
		const obj: any = { ...route }
		const { component, meta, redirect, children } = obj

		if (redirect) {
			obj.element = <Navigate to={redirect} replace={true} />
		} else if (component && (meta.useLayoutGuard || meta.useRouteGuard)) {
			obj.element = <Guard element={<LazyElement component={obj.component} />} meta={obj.meta} />
		} else if (component && meta.useRouteGuard) {
			obj.element = <Guard element={<LazyElement component={obj.component} />} meta={obj.meta} />
		} else {
			obj.element = <LazyElement component={obj.component} />
		}

		if (children) {
			obj.children = transRoutes(children)
		}
		;['redirect', 'component', 'meta'].forEach((name) => delete obj[name])

		list.push(obj as RouteObject)
	})
	return list
}
const AppRoutes: FC = () => useRoutes(transRoutes(routesList))

export default AppRoutes