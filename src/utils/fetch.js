import 'es6-promise'
import fetch from 'isomorphic-fetch'
import qs from 'qs'
import _ from 'lodash'
// import _ from 'underscore'
import { Storage } from '../utils/common'
import { LOCAL_STORAGE } from '../constants/Constants'
let initial= Storage.getItem(LOCAL_STORAGE)

let rootState = {...initial}

const requestTimeOut = 1000 * 600

export const syncStateToFetch = (app, initialState) => {
  console.log('123123')
  rootState = app._store.getState();
  if (_.isEmpty(rootState)) {
    rootState = initialState
  }
}

const checkStatus = (response) => {
  switch (response.status) {
    case 200:
      return response
    case 409:
      return response
    case 400:
      return response
    case 302:
      return response
    default:
      return response
  }
}

const parseJSON = (response) => {
  return response.json().then((json) => {
    return json
  }).catch((err) => {
    console.log(err)
    return Promise.reject({ // eslint-disable-line
      code: -1,
      msg: `${err}`
    })
  })
}

const completeHeader = (header) => {
  const state = (rootState || {}).example || {}

  const { access_token } = state
  const result = {
    ...header,
    ...{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: access_token ? `Bearer ${access_token}` : ''
    }
  }

  if (!access_token) delete result.Authorization

  return result
}

const getUrl = (url, query) => {
  return _.isEmpty(query) ? url : `${url}?${qs.stringify(query)}`
}

export const get = (url, query = {}, options = {}) => {
  const defaultOpt = {
    method: 'GET',
    timeout: requestTimeOut,
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const post = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'POST',
    timeout: requestTimeOut,
    body: JSON.stringify(data),
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const put = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'PUT',
    timeout: requestTimeOut,
    body: JSON.stringify(data),
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const del = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'DELETE',
    headers: { ...options },
    timeout: requestTimeOut,
    body: JSON.stringify(data)
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const patch = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'PATCH',
    timeout: requestTimeOut,
    body: JSON.stringify(data),
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const postFormData = (url, query = {}, data = {}, options = {}) => {
  const formData = new window.FormData()

  for (const i in data) {
    formData.append(i, data[i])
  }

  const defaultOpt = {
    method: 'POST',
    timeout: requestTimeOut,
    body: formData,
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  delete defaultOpt.headers['Content-Type']
  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const putFormData = (url, query = {}, data = {}, options = {}) => {
  const formData = new window.FormData()

  for (const i in data) {
    formData.append(i, data[i])
  }

  const defaultOpt = {
    method: 'PUT',
    timeout: requestTimeOut,
    body: formData,
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  delete defaultOpt.headers['Content-Type']

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const patchFormData = (url, query = {}, data = {}, options = {}) => {
  const formData = new window.FormData()

  for (const i in data) {
    formData.append(i, data[i])
  }

  const defaultOpt = {
    method: 'PATCH',
    timeout: requestTimeOut,
    body: formData,
    headers: { ...options }
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  delete defaultOpt.headers['Content-Type']

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}
