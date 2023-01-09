/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-09 14:12:35
 * @LastEditors: dingyuwen
 * @Description: 
 */
import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, decrementAsync } from '@/store/counter'

function Home() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const { count: storeCount, loading } = useSelector(state => state.counter)
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>React-router-dom v6 + RTK</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          state count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        {loading && <div>loading...</div>}
        {!loading && <div>store count is {storeCount}</div>}
        
        <br />
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(decrementAsync())}>decrementAsync</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Home
