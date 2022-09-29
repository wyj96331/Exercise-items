// 引入mockjs模块
import Mock from 'mockjs'

// 引入JSON格式数据
import banner from './banner.json'
import floor from './floor.json'
import orderInfo from './orderInfo.json'
import address from './address.json'
// mock数据：第一个参数请求数据的地址，第二个参数：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })// 轮播图数据
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/orderInfo', { code: 200, message: '成功', data: orderInfo, ok: true })
Mock.mock('/mock/address', { code: 200, message: '成功', data: address, ok: true })
