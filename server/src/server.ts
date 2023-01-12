/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2022-09-28 14:44:35
 * @LastEditTime: 2022-09-28 14:57:34
 * @LastEditors: dingyuwen
 * @Description:
 */
import express, { Request, Response} from 'express'
import cors from 'cors'
import { IncomingForm } from 'formidable'

const server = express()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
server.use(cors(corsOptions))

server.post('/upload', (req: Request, res: Response) => {
    const form = new IncomingForm()

    form.on('file', (field, file) => {
        // console.log('fileName: ', file.name)
        console.log('* * fileInfo: '+ file.originalFilename + ' - ' + file.size + ' - ' + file.mimetype + '* *')
    })

    form.parse(req)

    form.on('end', () => {
        res.json()
    })
})

server.listen(3000, () => {
    console.log('server running at 3000 port!')
})
