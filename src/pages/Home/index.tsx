/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-12 16:42:01
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
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
					<Button variant="light" onClick={() => setCount((count) => count + 1)}>
						state count is {count}
					</Button>
				</div>
				<div className="m-2 card">
					{loading && <div>loading...</div>}
					{!loading && <div>store count is {storeCount}</div>}

					<br />
					<div className="flex gap-2">
						<Button variant="light" onClick={() => dispatch(increment())}>
							increment
						</Button>
						<Button variant="light" onClick={() => dispatch(decrement())}>
							decrement
						</Button>
						<Button variant="light" onClick={() => dispatch(decrementAsync(1800))}>
							decrementAsync
						</Button>
					</div>
				</div>
			</div>
			<p className="pt-4 text-gray-600">Click on the Vite and React logos to learn more</p>
		</div>
	)
}

export default Home
