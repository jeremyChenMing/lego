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

export const uploaderFile = (data) => {
  return fetch.postFormData(`/api/upload`, {}, data)
}
