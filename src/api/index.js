import request from './request'
import mockRequest from './mockRequest'
/**
 * 获取三级联动列表数据
 * @returns Promise
 */
export const reqCategoryList = () => {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}
/**
 *获取轮播图数据
 * @returns Promise
 */
export const reqGetBannerList = () => {
  return mockRequest({
    url: '/banner',
    method: 'GET'
  })
}

/**
 *获取首页楼层列表
 * @returns Promise
 */
export const reqGetFloorList = () => {
  return mockRequest({
    url: '/floor',
    method: 'GET'
  })
}

/**
 *获取搜索列表
 * @param {params} params
 * @returns Promise
 */
export const reqGetSearchInfo = (params) => {
  return request({
    url: '/list',
    method: 'POST',
    data: params
  })
}
/**
 *获取商品详情信息
 * @param {skuId} skuId
 * @returns Promise
 */
export const reqGoodsInfo = (skuId) => {
  return request({
    url: `/item/${skuId}`,
    method: 'GET'
  })
}
/**
 *添加商品到购物车API
 * @param {商品id} skuId
 * @param {商品数量} skuNum
 * @returns Promise
 */
export const reqAddorUpdateShopCar = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}

/**
 * 获取购物册列表数据
 * @returns Promise
 */
export const reqShopCartList = () => {
  return request({
    url: '/cart/cartList',
    method: 'GET'
  })
}

/**
 * 删除购物车商品信息
 * @param {商品id} skuId
 * @returns Promise
 */
export const deleteGoodsInfo = (skuId) => {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
}

/**
 *切换商品选中状态
 * @param {商品id} skuID
 * @param {商品选中状态} isChecked
 * @returns Promise
 */
export const reqUpdateCheckCart = (skuId, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })
}

/**
 *获取验证码
 * @param {手机号码} phone
 * @returns Promise
 */
export const reqGetCode = (phone) => {
  return request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })
}

/**
 *用户注册
 * @param {{手机号,密码,验证码}} data
 * @returns Promise
 */
export const reqUserRegister = (data) => {
  return request({
    url: '/user/passport/register',
    method: 'POST',
    data
  })
}

/**
 *用户登录
 * @param {{手机号,密码}} data
 * @returns Promise
 */
export const reqUserLogin = (data) => {
  return request({
    url: '/user/passport/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息(请求头携带token)
 * @returns Promise
 */
export const reqGetUserInfo = () => {
  return request({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })
}

/**
 * 退出登录
 * @returns Promise
 */
export const reqLogout = () => {
  return request({
    url: '/user/passport/logout',
    method: 'GET'
  })
}
