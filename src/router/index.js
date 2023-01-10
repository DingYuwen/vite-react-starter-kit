/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:49:32
 * @LastEditTime: 2023-01-10 12:41:26
 * @LastEditors: dingyuwen
 * @Description:
 */

import DefaultLayout from '@/layout/DefaultLayout'
import PublicLayout from '@/layout/PublicLayout'
import AdminLayout from '@/layout/AdminLayout'
import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Guard from './Guard'
const LoadingComponent = () => <h3>loading...</h3>
// eslint-disable-next-line react/prop-types
const LazyElement = ({ component }) => <Suspense fallback={<LoadingComponent />}>{component}</Suspense>
const loadGuardElement = (component, meta) => <Guard element={<LazyElement component={component} />} meta={meta} />

const Login = lazy(() => import('@/pages/Login'))
const Admin = lazy(() => import('@/pages/Admin'))
const Dashboard = lazy(() => import('@/pages/Home/Dashboard'))
const Home = lazy(() => import('@/pages/Home'))

// 使用layout守卫或者路由守卫
function transRoutes(routes) {
	const list = []
	routes.forEach((route) => {
		const obj = { ...route }
		if (obj.element && obj.useLayoutGuard) {
			obj.element = loadGuardElement(obj.element, obj.meta)
		}
		if (obj.redirect) {
			obj.element = <Navigate to={obj.redirect} replace={true} />
		}
		if (obj.component) {
			obj.element = obj.useRouteGuard ? (
				loadGuardElement(obj.component, obj.meta)
			) : (
				<LazyElement component={obj.component} />
			)
		}
		if (obj.children) {
			obj.children = transRoutes(obj.children)
		}
		;['redirect', 'component', 'meta'].forEach((name) => delete obj[name])
		list.push(obj)
	})
	return list
}

export const routes = transRoutes([
	{
		path: '',
		element: <DefaultLayout />,
		useLayoutGuard: true,
		meta: {
			auth: true
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
		element: <PublicLayout />,
		useLayoutGuard: false,
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
		element: <AdminLayout />,
		useLayoutGuard: true,
		meta: {
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
])
