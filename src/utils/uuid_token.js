import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  // 先从本地存储获取uuid(看一下本地存储是否有)
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    // 如果没有，生成uuid
    uuid_token = uuidv4()
    // 进行本地存储
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}
