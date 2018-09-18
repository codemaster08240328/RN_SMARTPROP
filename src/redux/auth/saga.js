import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import AuthHelper from '../../service/auth';

export function* loginRequest() {
    yield takeEvery(actions.LOGIN_REQUEST, function*({payload}) {
      const  userInfo  = Object.assign({},payload);
      const result = yield call(AuthHelper.authorize, userInfo)
      if (result && !result.error) {
        yield put({
            type:actions.LOGIN_SUCCESS,
            payload:userInfo
        })
      } else {
        yield put({ 
            type: actions.LOGIN_ERROR,
            payload:result.error
          })
      }
    })
}


export default function* authSaga() {
    yield all([
        fork(loginRequest)
    ])
}