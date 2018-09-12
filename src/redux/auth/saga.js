import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import xmlHandle from '../../service/xmlRequest';
import {REQUEST, TYPE, SERVICE} from '../../settings/general-setting'
import AuthHelper from '../../service/auth';

export function* loginRequest() {
    yield takeEvery(actions.LOGIN_REQUEST, function*({payload}) {
      const  userInfo  = payload
      const result = yield call(AuthHelper.authorize, userInfo)
      if (result && !result.error) {
        yield put({
          type: actions.GET_USER,
          payload: userInfo
        })
      } else {
        yield put({ 
            type: actions.LOGIN_ERROR,
            payload:result.error
          })
      }
    })
}
export function *getUser(){
    yield takeEvery(actions.GET_USER, function* ({payload}){
        const userInfo = {
            'EMail' : payload.EMail
        }
        const result = yield call(AuthHelper.getUsers, userInfo)
        if(result && !result.error){
            yield put({
                type:actions.LOGIN_SUCCESS,
                payload:result
            })
        }else{
            yield put({
                type:actions.LOGIN_ERROR,
                payload:result.error
            })
        }
    })
}


export default function* authSaga() {
    yield all([
        fork(loginRequest), fork(getUser)
    ])
}