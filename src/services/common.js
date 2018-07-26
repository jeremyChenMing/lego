import * as fetch from '../utils/fetch'

// 上传文件
export const uploaderFile = (data) => {
  return fetch.postFormData(`/api/v1/file/upload`, {}, data)
}
export const uploaderFilePost = (data) => {
  return fetch.postFile(`/api/v1/file/upload`, {}, data)
}

// 
export const registerUser = (data) => {
  return fetch.post(`/api/v1/auth/register`, {}, data)
}
// 登录
export const loginUser = (data) => {
  return fetch.post(`/api/v1/auth/login`, {}, data)
}
// 退出
export const outUser = (data = {}) => {
  return fetch.post(`/api/v1/auth/logout`, {}, data)
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
// 新增产品
export const creatProduce = (data) => {
  return fetch.post(`/api/v1/products`, {}, data)
}


// 获取作者
export const getUsers = (query = {}) => {
  return fetch.get(`/api/v1/users`, query)
}
// 作者详情
export const getUsersOfDetail = (id,query = {}) => {
  return fetch.get(`/api/v1/users/${id}`, query)
}
// 获取作者的作品
export const getAuthOfProduce = (id,query = {}) => {
  return fetch.get(`/api/v1/users/${id}/products`, query)
}





