import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import xmlHandle from '../../service/xmlRequest';
import {REQUEST, TYPE, SERVICE} from '../../settings/general-setting'

export function* loginRequest() {
    yield takeEvery(actions.LOGIN_REQUEST, function*({payload}) {
      const  userInfo  = payload
      const type = {
          open:TYPE.createUpdateData_Open,
          close:TYPE.createUpdateData_Close
      }
    //   const result = xmlHandle(userInfo, SERVICE.createUpdateUser, type);
      const result = yield call(xmlHandle, userInfo, SERVICE.createUpdateUser, type);
      console.log('result~~~~~~~~~',result);
    //   const result = yield call(AuthHelper.authorize, userInfo)
    //   if (result && !result.error) {
    //     yield put({
    //       type: actions.LOGIN_SUCCESS,
    //       payload: result
    //     })
    //   } else {
    //     yield put({ 
    //         type: actions.LOGIN_ERROR,
    //         payload:result.error
    //       })
    //   }
    })
}

export default function* authSaga() {
    yield all([
        fork(loginRequest)
    ])
}