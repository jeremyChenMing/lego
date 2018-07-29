import { USER } from '../constants/ActionTypes'
import { LOCAL_STORAGE } from '../constants/Constants'
import { Storage } from '../utils/common'
import moment from 'moment'
import { } from '../services/common'
import { Modal } from 'antd'
import { routerRedux } from 'dva/router'
export default {

  namespace: USER.ROOT,

  state: {},

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      // console.log('订阅源')
      // return history.listen(({pathname}) => {
        // console.log(pathname)
        // if (pathname === '/performanceAppraisal/proassess') {
          // dispatch({type: 'GET_ALL_PEOPLE'})
        // }
      // })
      dispatch({type: 'checkLogin'})
    },
  },

  effects: {
    *fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'})
    },
    *checkLogin({payload}, {call, put, select}) {
      let mes = yield select(state => state.example)
      if (mes && mes.access_token && mes.expires_at) {
        const bool = moment().isBefore(mes.expires_at)
        console.log(bool)
        if (bool) {
          // 现在没有的时间没有过期
        }else{
          // 现在的时间过期了，需要清楚localStroge
          yield put({type: 'clear'})
          Modal.confirm({
            title: '登录失效',
            content: '登录凭证过期, 请重新登录！',
            okText: '确认',
            cancelText: '取消',
            onOk: () => { document.location.href = '#/login'},
            onCancel: () => {}
          });
          
        }
      }
    }
  },

  reducers: {

    [USER.SAVE_USERINFO] (state, {payload}) {
      const example = {
        ...state,
        ...payload
      }
      Storage.setItem(LOCAL_STORAGE, {example})
      // document.cookie = `id=Bearer ${payload.access_token}`
      return example
    },

    [USER.CLEAR_USERINFO] () {
      // Storage.clear()
      Storage.removeItem(LOCAL_STORAGE)
      return {}
    },
    clear(state, action) {
      Storage.removeItem(LOCAL_STORAGE)
      console.log(state)
      return {}
    }
  }

}
