/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-30 16:26:57
 * @LastEditTime: 2023-01-30 18:04:11
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useEffect, useRef, useState } from 'react'
import { createStyles } from '@mantine/core'

const getColorCode = () => parseInt((Math.random() * 255).toFixed())
const randomN = (n: number): number => parseInt((Math.random() * n).toFixed())
class Ball {
	x: number = randomN(380) + 30
	y: number = randomN(380) + 30
	r: number = randomN(20) + 10
	xSpeed: number = randomN(3) + 2
	ySpeed: number = randomN(3) + 1
	color: string = `rgb(${getColorCode()}, ${getColorCode()}, ${getColorCode()})`
	ctx: any
	constructor(ctx: any) {
		this.ctx = ctx
		this.show()
	}

	run() {}

	show() {
		const ctx = this.ctx
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		ctx.fillStyle = this.color
		ctx.fill()
	}
}

interface StyleProps {
	color: string
	[key: string]: any
}

const useStyles = createStyles((theme, { color }: StyleProps) => ({
	canvas: {
		color: color
	}
}))

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const color = `rgb(${getColorCode()}, ${getColorCode()}, ${getColorCode()})`
	const { classes } = useStyles({ color })
	const [ballList, setBallList] = useState<Ball[]>([])
	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d')
			const _ballList: Ball[] = []
			for (let i = 0; i < 5; i++) {
				const ball: Ball = new Ball(ctx)
				_ballList.push(ball)
			}
			setBallList(_ballList)
		}
		return () => {
			if (canvasRef.current) {
				const ctx = canvasRef.current.getContext('2d')
				ctx?.clearRect(0, 0, 500, 500)
			}
		}
	}, [])
	return (
		<div className={classes.canvas + ' text-center'}>
			<h1>canvas demo</h1>
			<canvas ref={canvasRef} className="border block mx-auto" height={500} width={500}></canvas>
		</div>
	)
}

export default Canvas
