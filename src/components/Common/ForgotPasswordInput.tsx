/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-11 17:33:06
 * @LastEditTime: 2023-01-11 17:33:13
 * @LastEditors: dingyuwen
 * @Description:
 */
import { PasswordInput, Text, Group, PasswordInputProps, Anchor } from '@mantine/core'

export default function ForgotPasswordInput({ className, style, ...others }: PasswordInputProps) {
	return (
		<div className={className} style={style}>
			<Group position="apart" mb={5}>
				<Text component="label" htmlFor="your-password" size="sm" weight={500}>
					Your password
				</Text>

				<Anchor<'a'>
					href="#"
					onClick={(event) => event.preventDefault()}
					sx={(theme) => ({
						paddingTop: 2,
						color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
						fontWeight: 500,
						fontSize: theme.fontSizes.xs
					})}
				>
					Forgot your password?
				</Anchor>
			</Group>
			<PasswordInput placeholder="Your password" id="your-password" {...others} />
		</div>
	)
}
