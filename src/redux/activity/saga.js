import { all, takeEvery, put, call, fork } from "redux-saga/effects";
import actions from "./action";
import ActHelper from '../../service/activity';

export function* actRequest() {
    yield takeEvery(actions.ACT_REQUEST, function*({payload}) {
      const  param  = Object.assign({},payload);
      const result = yield call(ActHelper.getActivity, param)
      if (result && !result.error) {
        yield put({
          type:actions.ACT_GET_SUCCESS,
          payload:result
        })
      } else {
        yield put({ 
          type: actions.ACT_GET_ERROR,
          payload:result.error
        })
      }
    })
}

export default function* reqSaga() {
  yield all([
    fork(actRequest)
  ])
}