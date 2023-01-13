/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 09:58:46
 * @LastEditTime: 2023-01-13 12:52:23
 * @LastEditors: dingyuwen
 * @Description:
 */

import { useRef, useState, FC } from 'react'
import { Text, Group, Box, Button, createStyles, Image, SimpleGrid, RingProgress } from '@mantine/core'
import { Dropzone, MIME_TYPES, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: 'relative',
		marginBottom: 30
	},

	dropzone: {
		borderWidth: 1,
		paddingBottom: 50
	},

	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
	},

	control: {
		position: 'absolute',
		width: 250,
		left: 'calc(50% - 125px)',
		bottom: -20
	}
}))
interface ImageViewProps {
	file: File
}
const ImageView: FC<ImageViewProps> = ({ file }) => {
	const [uploading, setUploading] = useState<boolean>(false)
	const [status, setStatus] = useState<boolean>(false)
	const [uploadProgressPercentage, setUploadProgressPercentage] = useState<number>(0)
	const sendRequest = (file: File) => {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest()

			req.upload.addEventListener('progress', (event: ProgressEvent) => {
				if (event.lengthComputable) {
					setUploadProgressPercentage(Number(Math.round(event.loaded / event.total * 100).toFixed(2)))
				}
			})

			req.upload.addEventListener('load', (event: Event) => {
				setUploadProgressPercentage(100)
				resolve(req.response)
			})

			req.upload.addEventListener('error', (event: any) => {
				setUploadProgressPercentage(0)
				reject(req.response)
			})

			const formData = new FormData()
			formData.append('file', file, file.name)

			req.open('POST', 'http://localhost:3000/upload')
			req.send(formData)
		})
	}

	const uploadFile = async () => {
		setUploading(true)

		try {
			await sendRequest(file)
			setUploading(false)
			setStatus(true)
		} catch (e) {
			console.log(e)
			setUploading(false)
			setStatus(false)
		}
	}
	const imageUrl = URL.createObjectURL(file)
	return (
		<div>
			<Box className="relative">
				<Image src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />
				<RingProgress
					className={`z-10 absolute inset-0 m-auto ${!uploading ? 'invisible' : ''}`}
					sections={[{ value: uploadProgressPercentage, color: 'blue' }]}
					label={
						<Text color="blue" weight={700} align="center" size="xl">
							{uploadProgressPercentage}%
						</Text>
					}
				/>
			</Box>

			<Button className="mt-2" disabled={uploading} onClick={uploadFile}>
				upload
			</Button>
		</div>
	)
}
export function Admin() {
	const { classes, theme } = useStyles()
	const openRef = useRef<() => void>(null)
	const [files, setFiles] = useState<FileWithPath[]>([])

	const previews = files.map((file, index) => <ImageView key={index} file={file} />)

	return (
		<div>
			<div className={classes.wrapper}>
				<Dropzone
					openRef={openRef}
					onDrop={setFiles}
					className={classes.dropzone}
					radius="md"
					accept={IMAGE_MIME_TYPE}
					maxSize={3 * 1024 ** 2}
				>
					<div style={{ pointerEvents: 'none' }}>
						<Group position="center">
							<Dropzone.Accept>
								<IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
							</Dropzone.Reject>
							<Dropzone.Idle>
								<IconCloudUpload
									size={50}
									color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
									stroke={1.5}
								/>
							</Dropzone.Idle>
						</Group>

						<Text align="center" weight={700} size="lg" mt="xl">
							<Dropzone.Accept>Drop files here</Dropzone.Accept>
							<Dropzone.Reject>Image file less than 3mb</Dropzone.Reject>
							<Dropzone.Idle>Upload resume</Dropzone.Idle>
						</Text>
						<Text align="center" size="sm" mt="xs" color="dimmed">
							Drag&apos;n&apos;drop files here to upload.
						</Text>
					</div>
				</Dropzone>

				<Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
					Select files
				</Button>
			</div>
			<SimpleGrid
				className="mt-10"
				cols={4}
				breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
				mt={previews.length > 0 ? 'xl' : 0}
			>
				{previews}
			</SimpleGrid>
		</div>
	)
}
export default Admin
