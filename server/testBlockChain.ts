/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-12 10:18:03
 * @LastEditTime: 2023-01-12 10:18:07
 * @LastEditors: dingyuwen
 * @Description:
 */
const { Block, Blockchain } = require('./block-chain')

let firstClain = new Blockchain()
firstClain.addBlock(new Block(0, '21/05/2022', { champion: 'Spain' }))
firstClain.addBlock(new Block(1, '22/05/2022', { champion: 'China' }))

// 检查是否有效(将会返回true)
console.log('firstClain valid? ' + firstClain.isChainValid(), firstClain.chain)

// 现在尝试操作变更数据
firstClain.chain[1].data = { champion: 'korea' }

// 再次检查是否有效 (将会返回false)
console.log('firstClain valid? ' + firstClain.isChainValid(), firstClain.chain)
