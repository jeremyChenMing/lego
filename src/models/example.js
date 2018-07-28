import { USER } from '../constants/ActionTypes'
import { LOCAL_STORAGE } from '../constants/Constants'
import { Storage } from '../utils/common'
import { } from '../services/common'
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
      // dispatch({type: 'checkLogin'})
    },
  },

  effects: {
    *fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'})
    },
    *checkLogin({payload}, {call, put, select}) {
      let mes = yield select(state => state.example)
      if (!mes.access_token) {
        // const data = yield call(addStepFirOfTpl, payload.values)
      }
    }
  },

  reducers: {

    [USER.SAVE_USERINFO] (state, {payload}) {
      const example = {
        ...state,
        ...payload
      }
      console.log(example)
      Storage.setItem(LOCAL_STORAGE, {example})
      // document.cookie = `id=Bearer ${payload.access_token}`
      return example
    },

    [USER.CLEAR_USERINFO] () {
      // Storage.clear()
      Storage.removeItem(LOCAL_STORAGE)
      return {}
    }
  }

}
