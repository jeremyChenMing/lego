import { USER } from '../constants/ActionTypes'
import { LOCAL_STORAGE } from '../constants/Constants'
import { Storage } from '../utils/common'
export default {

  namespace: USER.ROOT,

  state: {},

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
    keyboardWatcher ({dispatch, history}) {

    }
  },

  effects: {
    *fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'})
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
      document.cookie = `id=Bearer ${payload.access_token}`
      return example
    },

    [USER.CLEAR_USERINFO] () {
      // Storage.clear()
      Storage.removeItem(LOCAL_STORAGE)
      return {}
    }
  }

}
