/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:49:32
 * @LastEditTime: 2023-01-30 16:33:21
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

const CanvasDemo = lazy(() => import('@/pages/Demo/Canvas'))
const ThreeDemo = lazy(() => import('@/pages/Demo/3D'))
const NotFound = lazy(() => import('@/pages/Error/NotFound'))
const Login = lazy(() => import('@/pages/Login/MantineLogin'))
const Demo = lazy(() => import('@/pages/Demo'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const Admin = lazy(() => import('@/pages/Admin'))
const AdminSetting = lazy(() => import('@/pages/Setting'))
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
	component?: ReactNode
	redirect?: string
	meta?: RouteMeta
	children?: RouteObj[]
}

const routesList: RouteObj[] = [
	{
		path: '*',
		component: <NotFound />,
		meta: {
			auth: false,
			title: '404'
		}
	},
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
					title: 'Login'
				}
			},
			{
				path: 'signup',
				component: <SignUp />,
				meta: {
					title: 'SignUp'
				}
			},
			{
				path: 'forgotpassword',
				component: <ForgotPassword />,
				meta: {
					title: 'ForgotPassword'
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
			},
			{
				path: 'setting',
				component: <AdminSetting />,
				meta: {
					title: '控制台',
					auth: true
				}
			},
			{
				path: 'demo',
				component: <Demo />,
				children: [
					{
						path: '3d',
						component: <ThreeDemo />,
						meta: {
							title: '3d',
							auth: true
						}
					},
					{
						path: 'canvas',
						component: <CanvasDemo />,
						meta: {
							title: 'canvas',
							auth: true
						}
					}
				]
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
		} else if (component && meta && (meta.useLayoutGuard || meta.useRouteGuard)) {
			obj.element = <Guard element={<LazyElement component={component} />} meta={meta} />
		} else if (component) {
			obj.element = <LazyElement component={component} />
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
