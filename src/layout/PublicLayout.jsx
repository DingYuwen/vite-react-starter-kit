/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:46:48
 * @LastEditTime: 2023-01-09 15:37:15
 * @LastEditors: dingyuwen
 * @Description: 
 */
import { Outlet } from "react-router-dom"
const PublicLayout = () => <div>
    <h1>public layout</h1>
    <Outlet />
</div>

export default PublicLayout