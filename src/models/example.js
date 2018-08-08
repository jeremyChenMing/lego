import { USER } from '../constants/ActionTypes'
import { LOCAL_STORAGE } from '../constants/Constants'
import { Storage } from '../utils/common'
import { getProfile, getUsers } from '../services/common'
import { Modal } from 'antd'
import moment from 'moment'

export default {

  namespace: USER.ROOT,

  state: {

  },

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
    }
  },

  effects: {
    * setsMes ({payload}, {call, put, select}) {
      const auths = yield call(getProfile)
      console.log(payload, '1')
      console.log(auths, '2')
      yield put({type: 'sets', payload: {example: {...payload, ...auths}}})
    },
    * checkLogin ({payload}, {call, put, select}) {
      const mes = yield select(state => state.example)
      const bool = mes.expires_at ? moment().isBefore(mes.expires_at) : false
      if (payload === '/login' || payload === '/center') {

      } else {
        if (bool) {
          console.log('现在没有的时间没有过期')
        } else {
          yield put({type: 'clear'})
          console.log('登录已经过期了---现在的时间过期了，需要清楚localStroge')
        }
      }

      // if (payload === '/login' || payload === '/center') {

      // }else{
      //   const auths = yield call(getProfile);
      //   if (auths.code && auths.code === 'not_authenticated') {
      //     console.log('登录已经过期了---现在的时间过期了，需要清楚localStroge')
      //     yield put({type: 'clear'});
      //   }else{
      //     console.log('现在没有的时间没有过期')
      //     yield put({type: 'sets', payload: auths});
      //   }

      // }
    }
  },

  reducers: {
    [USER.CLEAR_USERINFO] () {
      // Storage.clear()
      Storage.removeItem(LOCAL_STORAGE)
      return {}
    },
    clear (state, action) {
      Storage.removeItem(LOCAL_STORAGE)
      return {}
    },

    sets (state, {payload}) {
      const example = {
        ...state,
        ...payload.example
      }
      Storage.setItem(LOCAL_STORAGE, {example: payload.example})
      return example
    }
  }

}
