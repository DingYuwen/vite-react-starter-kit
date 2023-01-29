/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-29 16:58:04
 * @LastEditTime: 2023-01-29 17:28:15
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment, PresentationControls } from '@react-three/drei'
import Watch from './Watch'
const ThreeDemo = () => (
	<div className="h-96" id="watch-canvas-container">
		<Canvas>
			<PresentationControls
				global
				config={{ mass: 2, tension: 500 }}
				snap={{ mass: 4, tension: 1500 }}
				rotation={[0, 0.3, 0]}
				polar={[-Math.PI / 3, Math.PI / 3]}
				azimuth={[-Math.PI / 1.4, Math.PI / 2]}
			>
				<Watch scale={60} rotation-x={Math.PI / 7} />
			</PresentationControls>

			<ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
			<Environment preset="city" />
		</Canvas>
	</div>
)

export default ThreeDemo
