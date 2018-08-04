
// import _ from 'underscore'
import _ from 'lodash'

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

export const getSearchObj = (location) =>{
    var  qs = location.search.length>0 ? location.search.substr(1):'',
    args = {},  
    items = qs.length>0 ? qs.split('&'):[],
    item = null,name = null,value = null,i = 0,len = items.length;

    for(i = 0;i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    }

    return args;
}

export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export const dataURLtoBlob = (dataurl) => {  
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

export const blobToDataURL = (blob, callback) => {
  var a = new FileReader();
  a.onload = function (e) { callback(e.target.result); }
  a.readAsDataURL(blob);
}

export const timeBase = (num = 4) => {
  const str = `${+new Date()}`;
  return str.substring(str.length - num);
}







