
import { ENV } from '../constants/ActionTypes'
import { getUsers } from '../services/common'

export default {

  namespace: ENV.ROOT,

  state: {
    authors: {},
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      console.log('123')
      dispatch({type: 'allAthors'})
    },
    
  },

  effects: {
    *allAthors({payload}, {call, put, select}) {
      const authors = yield call(getUsers);
      let objs = {};
      authors.map( item => {
        objs[item.id] = item
      })
      yield put({type: 'saveAthor', payload: objs})
    }
  },

  reducers: {
    saveAthor(state, {payload}) {
      return {
        ...state,
        authors: payload
      }
    },
  }

}
