import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import UnitHelper from '../../service/unit';
import AddUnitDoc from "../../pages/unit/AddUnitDoc";

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

export function* getUnitDoc(){
  yield takeEvery(actions.UNIT_DOC_REQUEST, function*({payload}){
    const  param  = Object.assign({},payload);
    const result = yield call(UnitHelper.getUnitDoc, param)
    if (result && !result.error) {
      yield put({
        type:actions.DOC_SUCCESS,
        payload:result
      })
    } else {
      yield put({ 
        type: actions.DOC_ERROR,
        payload:result.error
      })
    }
  })
}

export function* getDocCategory(){
  yield takeEvery(actions.DOC_CATE_REQUEST, function*({payload}){
    const result = yield call(UnitHelper.getDocCategory, payload)
    if(result && !result.error){
      yield put({
        type: actions.DOC_CATE_SUCCESS,
        payload: result
      })
    }else{
      yield put({
        type: actions.DOC_CATE_ERROR,
        payload: result.error
      })
    }
  })
}

export function* addUnitDoc(){
  yield takeEvery(actions.ADD_UNIT_DOC, function*({payload}){
    const result = yield call(UnitHelper.addUnitDoc, payload)
    if(result && !result.error){
      yield put({
        type: actions.ADD_DOC_SUCCESS,
        payload: result
      })
    }else{
      yield put({
        type: actions.ADD_DOC_ERROR,
        payload: result.error
      })
    }
  })
}

export default function* unitSaga() {
  yield all([
    fork(unitRequest), fork(lovunitRequest), fork(getUnitDoc), fork(getDocCategory), fork(addUnitDoc)
  ])
}