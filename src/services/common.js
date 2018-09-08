import * as fetch from '../utils/fetch'

// 1、获取用户token
export const getUserToken = (data) => {
  return fetch.post(`/api/v1/auth/access_token`, {}, data)
}
// 2、again token 再次获取token
export const getRefreshToken = (data) => {
  return fetch.post(`/api/v1/auth/refresh_token`, {}, data)
}
// 3、登录
export const loginUser = (data) => {
  return fetch.post(`/api/v1/auth/login`, {}, data)
}
// 4、退出
export const outUser = (data = {}) => {
  return fetch.post(`/api/v1/auth/logout`, {}, data)
}
// 5、注册用户
export const registerUser = (data) => {
  return fetch.post(`/api/v1/auth/register`, {}, data)
}

// 6、上传文件
export const uploaderFile = (data) => {
  return fetch.postFormData(`/api/v1/file/upload`, {}, data)
}

// 7、获取产品列表
export const getProducts = (query = {}) => {
  return fetch.get(`/api/v1/products`, query)
}
// 8、新增产品
export const creatProduce = (data) => {
  return fetch.post(`/api/v1/products`, {}, data)
}
// 9、获取产品详情
export const getProductsOfDetail = (id, query = {}) => {
  return fetch.get(`/api/v1/products/${id}`, query)
}

// 。。。。。。。。。？
// 10、更新产品
export const putProduce = (id, data, query = {}) => { // 未完成
  return fetch.put(`/api/v1/products/${id}`, query, data)
}
// 11、
export const patchProduce = (id, data, query = {}) => { // 未完成
  return fetch.put(`/api/v1/products/${id}`, query, data)
}
// 。。。。。。。。。？

// 13、点赞
export const givePraise = (id, data) => {
  return fetch.post(`/api/v1/products/${id}/votes`, {}, data)
}

// 。。。。。。。。。？
// 14、获取作者简介
export const getProfile = (query = {}) => {
  return fetch.get(`/api/v1/user/profile`, query)
}
// 15、更新作者简介
export const putProfile = (data, query = {}) => {
  return fetch.put(`/api/v1/user/profile`, query)
}
// 16、删除作者简介
export const patchProfile = (data, query = {}) => {
  return fetch.patch(`/api/v1/user/profile`, query, data)
}
// 。。。。。。。。。？

// 17、获取作者
export const getUsers = (query = {}) => {
  return fetch.get(`/api/v1/users`, query)
}
// 18、作者详情
export const getUsersOfDetail = (id, query = {}) => {
  return fetch.get(`/api/v1/users/${id}`, query)
}
// 19、获取作者的作品
export const getAuthOfProduce = (id, query = {}) => {
  return fetch.get(`/api/v1/users/${id}/products`, query)
}

// 评论
// 获取评论列表
export const getCommentsList = (id, query = {}) => {
  return fetch.get(`/api/v1/products/${id}/comments`, query)
}
// 发起评论
export const addFirComments = (id, data, query = {}) => {
  return fetch.post(`/api/v1/products/${id}/comments`, query, data)
}

// 获取子评论
export const getSonComments = (id, query = {}) => {
  return fetch.get(`/api/v1/products/comments/${id}`, query)
}
// 增加子评论
export const addSonComments = (id, data, query = {}) => {
  return fetch.patch(`/api/v1/products/comments/${id}`, query, data)
}


// 获取短信
export const getSMS = (data, query = {}) => {
  return fetch.post(`/api/v1/auth/sms_send`, query, data)
}
// 修改密码
// 
export const changePassword = (data, query = {}) => {
  return fetch.post(`/api/v1/user/password_renew`, query, data)
}
// 重置密码
export const resetPassword = (data, query = {}) => {
  return fetch.post(`/api/v1/user/password_reset`, query, data)
}


// 我投票的产品
export const getMyVotesProducts = (query = {}) => {
  return fetch.get(`/api/v1/user/voted_products`, query)
}

