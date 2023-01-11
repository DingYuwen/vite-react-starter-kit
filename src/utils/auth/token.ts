/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 16:08:44
 * @LastEditTime: 2023-01-11 16:15:59
 * @LastEditors: dingyuwen
 * @Description:
 */
import { lStorage } from '@/utils'

const TOKEN_CODE = 'access_token'
const DURATION = 6 * 60 * 60

export function getToken() {
	return lStorage.get(TOKEN_CODE)
}

export function setToken(token: string) {
	lStorage.set(TOKEN_CODE, token, DURATION)
}

export function removeToken() {
	lStorage.remove(TOKEN_CODE)
}
