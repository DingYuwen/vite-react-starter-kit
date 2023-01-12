/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 10:10:29
 * @LastEditTime: 2023-01-12 16:13:27
 * @LastEditors: dingyuwen
 * @Description:
 */

import { useAppSelector } from '@/store/hooks'
import { Title } from '@mantine/core'
const UserInfo = () => {
	const { userInfo } = useAppSelector((state) => state.user)

	return (
		<div>
			<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
				{userInfo.name}
			</Title>
		</div>
	)
}
export default UserInfo
