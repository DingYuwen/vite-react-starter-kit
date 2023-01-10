/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-10 10:24:47
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { increment, decrement, decrementAsync } from '@/store/counter'

function Home() {
	const [count, setCount] = useState(0)
	const dispatch = useDispatch()
	const { count: storeCount, loading } = useSelector((state) => state.counter)
	const { userInfo } = useSelector((state) => state.user)
	return (
		<div className="home">
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

			<div className="flex p-4 m-4">
				<div className="m-2 card flex place-items-center">
					<button onClick={() => setCount((count) => count + 1)}>state count is {count}</button>
				</div>
				<div className="m-2 card">
					{loading && <div>loading...</div>}
					{!loading && <div>store count is {storeCount}</div>}

					<br />
					<button onClick={() => dispatch(increment())}>increment</button>
					<button onClick={() => dispatch(decrement())}>decrement</button>
					<button onClick={() => dispatch(decrementAsync())}>decrementAsync</button>
				</div>
			</div>
			{userInfo.name && <Link to="/admin">To Admin Page</Link>}
			<p className="pt-4 read-the-docs">Click on the Vite and React logos to learn more</p>
		</div>
	)
}

export default Home
