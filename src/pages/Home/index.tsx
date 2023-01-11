/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-11 17:46:53
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Link } from 'react-router-dom'
import { increment, decrement, decrementAsync } from '@/store/counter'

function Home() {
	const [count, setCount] = useState(0)
	const dispatch = useAppDispatch()
	const { count: storeCount, loading } = useAppSelector((state) => state.counter)
	const { userInfo } = useAppSelector((state) => state.user)
	return (
		<div className="home text-center">
			<div className="place-items-center">
				<div className="inline-flex">
					<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
						<img src="/vite.svg" className="logo" alt="Vite logo" />
					</a>
					<a href="https://reactjs.org" target="_blank" rel="noreferrer">
						<img src={reactLogo} className="logo react" alt="React logo" />
					</a>
				</div>
			</div>
			<h1>Vite + React</h1>
			<h1>React-router-dom v6 + RTK</h1>

			<div className="flex justify-center p-4 m-4">
				<div className="m-2 card flex place-items-center">
					<button onClick={() => setCount((count) => count + 1)}>state count is {count}</button>
				</div>
				<div className="m-2 card">
					{loading && <div>loading...</div>}
					{!loading && <div>store count is {storeCount}</div>}

					<br />
					<button onClick={() => dispatch(increment())}>increment</button>
					<button onClick={() => dispatch(decrement())}>decrement</button>
					<button onClick={() => dispatch(decrementAsync(1800))}>decrementAsync</button>
				</div>
			</div>
			{userInfo.name && <Link to="/admin">To Admin Page</Link>}
			<p className="pt-4 text-gray-600">Click on the Vite and React logos to learn more</p>
		</div>
	)
}

export default Home
