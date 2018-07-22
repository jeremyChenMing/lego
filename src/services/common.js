import * as fetch from '../utils/fetch'

export const getMessage = () => {
  return fetch.get(`/api/users`, {})
}

export const postMessage = (data) => {
  return fetch.post(`/api/users`, {}, data)
}
export const delMessage = (uuid) => {
  return fetch.del(`/api/users/${uuid}`, {})
}








// 接口开始位置
// 上传文件
export const uploaderFile = (data) => {
  return fetch.postFormData(`/api/v1/file/upload`, {}, data)
}

// 
export const registerUser = (data) => {
  return fetch.post(`/api/v1/auth/register`, {}, data)
}

export const loginUser = (data) => {
  return fetch.post(`/api/v1/auth/login`, {}, data)
}

export const getUserToken = (data) => {
  return fetch.post(`/api/v1/auth/access_token`, {}, data)
}
// again token 再次获取token
export const getRefreshToken = (data) => {
  return fetch.post(`/api/v1/auth/refresh_token`, {}, data)
}



// 获取产品列表
export const getProducts = (query = {}) => {
  return fetch.get(`/api/v1/products`, query)
}
// 获取产品详情
export const getProductsOfDetail = (id, query = {}) => {
  return fetch.get(`/api/v1/products/${id}`, query)
}







