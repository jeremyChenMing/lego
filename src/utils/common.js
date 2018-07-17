/**
 * Created by nap on 17/9/4.
 */
import _ from 'underscore'

const storage = window.localStorage

export const open = (url) => {
  const iframe = document.createElement('iframe')
  iframe.src = url
  document.body.appendChild(iframe)
  setTimeout(() => {
    document.body.removeChild(iframe)
  }, 1000)
}

export const download = (url) => {
  const a = document.createElement('a')
  a.download = true
  a.href = url
  a.click()
}

export const loadFile = (url) => {
  const a = document.createElement('a')
  // console.log(url,'--')
  const str = url.substring(url.lastIndexOf('/') + 1)
  console.log(str)
  a.download = str
  a.href = `${url}`//eslint-disable-line
  a.className = 'domA'
  document.body.appendChild(a) // 火狐浏览器需要这样才可以
  a.click()
}

const getValue = (key) => {
  let v = storage.getItem(key)
  try {
    v = JSON.parse(v)
    return v
  } catch (e) {
    return v
  }
}

export const Storage = {

  setItem (key, value) {
    const v = getValue(key)

    if (_.isObject(value) || _.isArray(value)) {
      storage.setItem(key, JSON.stringify({ ...v, ...value }))
    } else {
      storage.setItem(key, value)
    }
  },

  getItem: getValue,

  removeItem (key) {
    storage.removeItem(key)
  },

  clear () {
    storage.clear()
  }
}

export const deepClone = obj => JSON.parse(JSON.stringify(obj))
