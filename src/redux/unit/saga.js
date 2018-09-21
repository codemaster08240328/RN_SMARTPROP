import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import UnitHelper from '../../service/unit';

export function* unitRequest() {
    yield takeEvery(actions.UNIT_REQUEST, function*({payload}) {
      const  param  = Object.assign({},payload);
      const result = yield call(UnitHelper.getUnit, param)
      if (result && !result.error) {
        yield put({
          type:actions.LOV_UNIT_GET,
          payload:result
        })
      } else {
        yield put({ 
          type: actions.UNIT_GET_ERROR,
          payload:result.error
        })
      }
    })
}

export function* lovunitRequest(){
  yield takeEvery(actions.LOV_UNIT_GET, function*({payload}){
    for(i=0;i<payload.length;i++){
      const param = Object.assign({}, payload[i]);
      const result = yield call(UnitHelper.getLovUnit, param)
      if(result && !result.error) {
        yield put({
          type:actions.UNIT_GET_SUCCESS,
          payload:result
        })
      }else{
        yield put({
          type:actions.UNIT_GET_ERROR,
          payload:result.error
        })
        return
      }
    }
  })
}


export default function* unitSaga() {
  yield all([
    fork(unitRequest), fork(lovunitRequest)
  ])
}