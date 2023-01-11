/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 16:08:49
 * @LastEditTime: 2023-01-11 16:12:35
 * @LastEditors: dingyuwen
 * @Description:
 */
import { createStorage } from './storage'

const prefixKey = 'Vite_React_DYW'
interface Option {
	prefixKey?: string
}
export const createLocalStorage = function (option: Option) {
	return createStorage({
		prefixKey: option.prefixKey || '',
		storage: 'localStorage'
	})
}

export const createSessionStorage = function (option: Option) {
	return createStorage({
		prefixKey: option.prefixKey || '',
		storage: 'sessionStorage'
	})
}

export const lStorage = createLocalStorage({ prefixKey })

export const sStorage = createSessionStorage({ prefixKey })
