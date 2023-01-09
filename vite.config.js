/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-05 14:13:32
 * @LastEditTime: 2023-01-09 18:27:16
 * @LastEditors: dingyuwen
 * @Description:
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		include: ['lodash-es'],
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	build: {
		cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
		sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
		target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
		chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
		assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
		minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
		terserOptions: {
			compress: {
				drop_console: true, // 生产环境去除console
				drop_debugger: true, // 生产环境去除debugger
			},
		},
	},
	server: {
		host: '0.0.0.0',
		port: 3000, // 设置服务启动端口号
		open: false, // 设置服务启动时是否自动打开浏览器
		cors: true, // 允许跨域

		// 设置代理，根据项目实际情况配置
		// proxy: {
		// 	'/api': {
		// 		target: '',
		// 		changeOrigin: true,
		// 		secure: false,
		// 		rewrite: (path) => path.replace('/api/', '/'),
		// 	},
		// },
	},
})
