/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-10 00:09:26
 * @LastEditors: dingyuwen ding_yuwen@163.com
 * @Description:
 */
import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, decrementAsync } from '@/store/counter'

function Home() {
	const [count, setCount] = useState(0)
	const dispatch = useDispatch()
	const { count: storeCount, loading } = useSelector((state) => state.counter)
	return (
		<div className="App">
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
			<div className="m-2">
				<button onClick={() => setCount((count) => count + 1)}>state count is {count}</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<div className="m-2">
				{loading && <div>loading...</div>}
				{!loading && <div>store count is {storeCount}</div>}

				<br />
				<button onClick={() => dispatch(increment())}>increment</button>
				<button onClick={() => dispatch(decrement())}>decrement</button>
				<button onClick={() => dispatch(decrementAsync())}>decrementAsync</button>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</div>
	)
}

export default Home
