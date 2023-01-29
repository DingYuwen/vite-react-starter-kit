/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-29 16:58:15
 * @LastEditTime: 2023-01-29 17:25:03
 * @LastEditors: dingyuwen
 * @Description:
 */
import React, { useRef, FC } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

interface PropsType {
	[k: string]: any
}
const Watch: FC<PropsType> = (props) => {
	const model = useGLTF('/src/pages/Demo/3D/watch.glb')
	const ref = useRef<Mesh>(null!)
	useFrame((state) => {
		if (!ref.current) return
		const t = state.clock.getElapsedTime()
		ref.current.rotation.y = Math.sin(t / 4) / 8
		ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
		ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
	})

	return (
		<>
			<primitive object={model.scene} ref={ref} {...props} />;
		</>
	)
}

export default Watch
