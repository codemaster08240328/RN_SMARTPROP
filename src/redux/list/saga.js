import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import ListHelper from '../../service/list';

export function* listRequest() {
    yield takeEvery(actions.LIST_REQUEST, function*({payload}) {
      const  param  = Object.assign({},payload);
      const result = yield call(ListHelper.listRequest, param)
      if (result && !result.error) {
        yield put({
          type:actions.LIST_GET_SUCCESS,
          payload:result
        })
      } else {
        yield put({ 
          type: actions.LIST_GET_ERROR,
          payload: result.error
        })
      }
    })
}

export function* AddNewList(){
  yield takeEvery(actions.ADD_LIST, function*({payload}){
    const param = Object.assign({}, payload)
    const result = yield call(ListHelper.addList, param)
    if(result && !result.error) {
      yield put({
        type: actions.ADD_SUCCESS,
        payload: result
      })
    } else {
      yield put({
        type: actions.ADD_FAIL,
        payload: result.error
      })
    }
  })
}

export default function* listSaga() {
  yield all([
    fork(listRequest),
    fork(AddNewList)
  ])
}