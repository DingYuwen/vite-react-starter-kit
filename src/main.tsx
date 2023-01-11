/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-11 18:30:21
 * @LastEditors: dingyuwen
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import AppRoutes from '@/router'
import './index.css'
import '@/assets/style/preflight.css'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<MantineProvider withGlobalStyles withNormalizeCSS>
					<AppRoutes />
				</MantineProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)
