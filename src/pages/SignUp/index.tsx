/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-12 18:07:00
 * @LastEditTime: 2023-01-12 18:44:07
 * @LastEditors: dingyuwen
 * @Description:
 */
import { useState } from 'react'
import {
	Progress,
	Popover,
	Box,
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
	InputBase
} from '@mantine/core'
import InputMask from 'react-input-mask'
import { IconX, IconCheck } from '@tabler/icons'
import { useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
	return (
		<Text color={meets ? 'teal' : 'red'} sx={{ display: 'flex', alignItems: 'center' }} mt={7} size="sm">
			{meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
		</Text>
	)
}

const requirements = [
	{ re: /[0-9]/, label: 'Includes number' },
	{ re: /[a-z]/, label: 'Includes lowercase letter' },
	{ re: /[A-Z]/, label: 'Includes uppercase letter' },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' }
]

function getStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1
		}
	})

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

export default function AuthenticationTitle() {
	const { loading } = useAppSelector((state) => state.user)
	const navigate = useNavigate()
	const [popoverOpened, setPopoverOpened] = useState(false)
	const [value, setValue] = useState('')
	const [checked, setChecked] = useState(false)
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
	))

	const strength = getStrength(value)
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'
	return (
		<Container size={420} my={40}>
			<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
				Generate an account
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Already have an account?{' '}
				<Anchor<'a'>
					href="#"
					size="sm"
					onClick={(event) => {
						event.preventDefault()
						navigate('/login')
					}}
				>
					Sign in
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput label="Email" placeholder="you@mantine.dev" required />
				<InputBase label="Phone " placeholder="Your phone" mt="md" component={InputMask} mask="+86 999-9999-9999" />
				<Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
					<Popover.Target>
						<div onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
							<PasswordInput
								mt="md"
								withAsterisk
								label="Your password"
								placeholder="Your password"
								value={value}
								onChange={(event) => setValue(event.currentTarget.value)}
							/>
						</div>
					</Popover.Target>
					<Popover.Dropdown>
						<Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
						<PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
						{checks}
					</Popover.Dropdown>
				</Popover>

				<PasswordInput label="Confirm password" placeholder="Your password" required mt="md" />
				<Checkbox
					checked={checked}
					onChange={(event) => setChecked(event.currentTarget.checked)}
					mt="md"
					label={
						<>
							Accepts{' '}
							<Anchor size="sm" href="https://mantine.dev" target="_blank">
								terms and conditions
							</Anchor>
						</>
					}
				/>
				<Button disabled={!checked} loading={loading} fullWidth mt="xl">
					Sign up
				</Button>
			</Paper>
		</Container>
	)
}
