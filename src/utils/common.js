
import _ from 'lodash'

// export const HOST = document.location.hostname === 'localhost' ? 'http://bricks.upvi.com' : '';
export const HOST = ''

const storage = window.localStorage

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

export const getSearchObj = (location) => {
  const qs = location.search.length > 0 ? location.search.substr(1) : ''
  const args = {}
  const items = qs.length > 0 ? qs.split('&') : []
  let item = null
  let name = null
  let value = null
  let i = 0
  let len = items.length

  for (i = 0; i < len; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])

    if (name.length) {
      args[name] = value
    }
  }

  return args
}

export const getCookie = (name) => {
  var strcookie = document.cookie// 获取cookie字符串
  var arrcookie = strcookie.split('; ')// 分割
  console.log(strcookie)
  // 遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split('=')
    if (arr[0] === name) {
      return arr[1]
    }
  }
  return ''
}

export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})// eslint-disable-line
}

export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime }) // eslint-disable-line
}

export const blobToDataURL = (blob, callback) => {
  let a = new FileReader(); // eslint-disable-line
  a.onload = function (e) { callback(e.target.result) }
  a.readAsDataURL(blob)
}

export const timeBase = (num = 4) => {
  const str = `${+new Date()}`
  return str.substring(str.length - num)
}




// 兼容图片下载
//判断浏览器类型 

{/*

<div id="down">
  <a id="download"></a>
</div>

*/}
// var odownload = document.getElementById('download')

function myBrowser(){ 
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
  var isOpera = userAgent.indexOf("Opera") > -1; 
  if (isOpera) { return "Opera" }; //判断是否Opera浏览器 
  if (userAgent.indexOf("Firefox") > -1) { return "FF"; } //判断是否Firefox浏览器 
  if (userAgent.indexOf("Chrome") > -1){ return "Chrome"; } 
  if (userAgent.indexOf("Safari") > -1) { return "Safari"; } //判断是否Safari浏览器 
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { return "IE"; }; //判断是否IE浏览器 
  if (userAgent.indexOf("Trident") > -1) { return "Edge"; } //判断是否Edge浏览器 
}

function SaveAs5(imgURL) { 
  var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000"); 
  for(; oPop.document.readyState != "complete"; ) { 
    if (oPop.document.readyState == "complete")break; 
  } 
  oPop.document.execCommand("SaveAs"); 
  oPop.close(); 
}

export function oDownload(url) {
  let type = myBrowser();
  console.log(type)
  if (type === 'IE' || type === 'Edge') {
    oA.href = '#';
    var oImg = document.createElement('img');
    oImg.src = url;
    oImg.id = 'downImg';
    var oDown = document.getElementById('down');
    oDown.appendChild(oImg);
    saveAs5(document.getElementById('downImg').src)
  }else{
    // 非IE
    console.log('非IE', odownload)
    odownload.href = url
    odownload.download= true
    odownload.click()
  }

}








