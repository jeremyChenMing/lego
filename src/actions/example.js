import { USER } from '../constants/ActionTypes' // eslint-disable-line

// 保存登录信息
export const saveUserInfo = (values) => {
  return {
    type: `${USER.ROOT}/${USER.SAVE_USERINFO}`,
    payload: values
  }
}
export const clearUserInfo = () => {
  return {
    type: `${USER.ROOT}/${USER.CLEAR_USERINFO}`
  }
}

