/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 18:47:21
 * @LastEditTime: 2023-01-11 16:13:53
 * @LastEditors: dingyuwen
 * @Description:
 */
import { isNullOrUndef } from '@/utils'

type StorageType = 'localStorage' | 'sessionStorage'

interface Option {
	prefixKey: string;
	storage: StorageType;
}

// 👇️ type T = "name" | "country"
type WindowKeys = keyof typeof window

class Storage {
	storage: string
	prefixKey: string
	constructor(option: Option) {
		this.storage = option.storage
		this.prefixKey = option.prefixKey
	}

	getKey(key: string) {
		return `${this.prefixKey}${key}`.toUpperCase()
	}

	set(key:string, value: any, expire: number | null) {
		const stringData: string = JSON.stringify({
			value,
			time: Date.now(),
			expire: !isNullOrUndef(expire) ? new Date().getTime() + (expire as number) * 1000 : null
		})
		window[this.storage as WindowKeys].setItem(this.getKey(key), stringData)
	}

	get(key: string) {
		const { value } = this.getItem(key, {})
		return value
	}

	getItem(key: string, def: any) {
		const val = window[this.storage as WindowKeys].getItem(this.getKey(key))
		if (!val) return def
		try {
			const data = JSON.parse(val)
			const { value, time, expire } = data
			if (isNullOrUndef(expire) || expire > new Date().getTime()) {
				return { value, time }
			}
			this.remove(key)
			return def
		} catch (error) {
			this.remove(key)
			return def
		}
	}

	remove(key: string) {
		window[this.storage as WindowKeys].removeItem(this.getKey(key))
	}

	clear() {
		window[this.storage as WindowKeys].clear()
	}
}

export function createStorage({ prefixKey = '', storage = 'localStorage' }: Option) {
	return new Storage({ prefixKey, storage })
}
