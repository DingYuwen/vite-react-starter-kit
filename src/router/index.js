/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 13:49:32
 * @LastEditTime: 2023-01-09 16:50:10
 * @LastEditors: dingyuwen
 * @Description: 
 */

import DefaultLayout from '@/layout/DefaultLayout'
import PublicLayout from '@/layout/PublicLayout'
import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Guard from './Guard'
const LoadingComponent = () => <h3>loading...</h3>
const loadElement = (component, meta) => {
    const LazyElement = () => <Suspense fallback={<LoadingComponent />}>{component}</Suspense>
    return <Guard element={<LazyElement />} meta={meta} />
}

const Login = lazy(() => import('@/pages/Login'))
const Dashboard = lazy(() => import('@/pages/Home/Dashboard'))
const Home = lazy(() => import('@/pages/Home'))

function transRoutes(routes) {
    const list = [];
    routes.forEach(route => {
        const obj = { ...route };
        if (obj.redirect) {
            obj.element = <Navigate to={obj.redirect} replace={true} />
        }
        if (obj.component) {
            obj.element = loadElement(obj.component, obj.meta)
        }
        if (obj.children) {
            obj.children = transRoutes(obj.children)
        }
        ['redirect','component','meta'].forEach(name => delete obj[name]);
        list.push(obj)
    });
    return list
}

export const routes = transRoutes([
    {
        path: '', 
        element: <DefaultLayout />,
        children: [
            {
                path: '',
                component: <Home />,
                meta: {
                    title: '首页',
                    auth: true,
                }
            },
            {
                path: 'dashboard',
                component: <Dashboard />,
                meta: {
                    title: '工作台',
                    auth: true,
                }
            },
        ]
    },
    {  
        path: '', 
        element: <PublicLayout/>,
        children: [
            {
                path: 'login',
                component: <Login />,
                meta: {
                    title: '登录',
                }
            },
        ]
    },
])