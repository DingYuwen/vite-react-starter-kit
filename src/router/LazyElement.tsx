/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-11 11:20:54
 * @LastEditTime: 2023-01-11 14:49:12
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Suspense, FC, ReactNode } from 'react'

const LoadingComponent: FC = () => (<h3>loading...</h3>)

interface PropsType {
	component: ReactNode | null
}
const LazyElement: FC<PropsType> = (props) => {
	return <Suspense fallback={<LoadingComponent />}>{props.component}</Suspense>
}

export default LazyElement
