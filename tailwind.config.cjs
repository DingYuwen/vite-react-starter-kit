/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 09:13:12
 * @LastEditTime: 2023-01-11 18:27:14
 * @LastEditors: dingyuwen
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {}
	},
	plugins: [],
	corePlugins: {
    preflight: false,
  }
}
