import dva from 'dva'
import createLoading from 'dva-loading'
import { message } from 'antd'
import { reducer as formReducer } from 'redux-form'
import { syncStateToFetch } from './utils/fetch'
import createHistory from 'history/createHashHistory'
// import createHistory from 'history/createBrowserHistory'
import './less/index.less'
import { Storage } from './utils/common'
import { LOCAL_STORAGE } from './constants/Constants'
import moment from 'moment'
import { notification } from 'antd'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
notification.config({
  placement: 'topRight',
  top: 55
})

let initialState = Storage.getItem(LOCAL_STORAGE)

const historys = createHistory()

// 1. Initialize
const app = dva({
  initialState,
  history: historys,
  extraReducers: {
    form: formReducer
  },
  onError: (e) => {
    message.error(`错误：${e.message}`, 3)
  }
})

app.use(createLoading())

app.use({
  onStateChange: syncStateToFetch.bind(null, app, initialState)
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example'))
app.model(require('./models/env'))
//  上述在 陆游中实现了动态的加载
// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
