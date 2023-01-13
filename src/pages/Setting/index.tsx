/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-13 10:27:38
 * @LastEditTime: 2023-01-13 10:39:08
 * @LastEditors: dingyuwen
 * @Description:
 */
import { UserCardImage, UserCardImageProps } from '@/components/UserInfo'
import { useAppSelector } from '@/store/hooks'
const mockData: UserCardImageProps = {
	image:
		'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
	avatar:
		'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
	name: 'Bill Headbanger',
	job: 'Fullstack engineer',
	stats: [
		{
			value: '34K',
			label: 'Followers'
		},
		{
			value: '187',
			label: 'Follows'
		},
		{
			value: '1.6K',
			label: 'Posts'
		}
	]
}
const Admin = () => {
	const { userInfo } = useAppSelector((state) => state.user)
	mockData.name = userInfo.name
	return (
		<div>
			<UserCardImage {...mockData} />
		</div>
	)
}

export default Admin
