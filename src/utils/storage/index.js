/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 16:08:49
 * @LastEditTime: 2023-01-09 16:09:02
 * @LastEditors: dingyuwen
 * @Description:
 */
import { createStorage } from './storage'

const prefixKey = 'Vite_React_DYW'

export const createLocalStorage = function (option = {}) {
	return createStorage({
		prefixKey: option.prefixKey || '',
		storage: localStorage
	})
}

export const createSessionStorage = function (option = {}) {
	return createStorage({
		prefixKey: option.prefixKey || '',
		storage: sessionStorage
	})
}

export const lStorage = createLocalStorage({ prefixKey })

export const sStorage = createSessionStorage({ prefixKey })
