import { USER } from '../constants/ActionTypes'
import { LOCAL_STORAGE } from '../constants/Constants'
import { Storage } from '../utils/common'
import { getProfile } from '../services/common'
import { Modal } from 'antd'

export default {

  namespace: USER.ROOT,

  state: {},

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      console.log('订阅源')
      // return history.listen(({pathname}) => {
        // console.log(pathname)
        // if (pathname === '/performanceAppraisal/proassess') {
          // dispatch({type: 'GET_ALL_PEOPLE'})
        // }
      // })
      dispatch({type: 'checkLogin', payload: history.location.pathname})
    },
  },

  effects: {
    *fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'})
    },
    *checkLogin({payload}, {call, put, select}) {

      const auths = yield call(getProfile)
      
      if (auths.code && auths.code === 'not_authenticated') {
        console.log('登录已经过期了---现在的时间过期了，需要清楚localStroge')
        yield put({type: 'clear'});
        if (payload === '/login') {

        }else{
          Modal.confirm({
            title: '登录失效',
            content: '登录凭证过期, 请重新登录！',
            okText: '确认',
            cancelText: '取消',
            onOk: () => { document.location.href = '#/login'},
            onCancel: () => {}
          }); 
        }
        
      }else{
        console.log(auths)
        // 现在没有的时间没有过期
        yield put({type: 'sets', payload: auths});
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
      return {}
    },
    sets(state, {payload}) {
      const example = {
        ...state,
        ...payload
      }
      Storage.setItem(LOCAL_STORAGE, {example})
      return example
    }
  }

}
