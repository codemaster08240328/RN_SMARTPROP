import { all, takeEvery, put, call, fork } from "redux-saga/effects";
import actions from "./action";
import ReqHelper from '../../service/request';
import { constants } from '../../settings/appconfig';

export function* reqRequest() {
    yield takeEvery(actions.REQ_REQUEST, function*({payload}) {
      const  param  = Object.assign({},payload);
      const result = yield call(ReqHelper.getRequest, param)
      if (result && !result.error) {
        yield put({
          type:actions.REQ_GET_SUCCESS,
          payload:result
        })
      } else {
        yield put({ 
          type: actions.REQ_GET_ERROR,
          payload:result.error
        })
      }
    })
}

export function* reqTypeRequest(){
  yield takeEvery(actions.REQ_TYPE_REQUEST, function*({payload}){
    const param = Object.assign({}, payload);
    const result = yield call(ReqHelper.getReqType, param)
    if(result && !result.error) {
      yield put({
        type: actions.REQ_TYPE_SUCCESS,
        payload: result
      })
    }else{
      yield put({
        type: actions.REQ_TYPE_ERROR,
        payload
      })
    }
  })
}

export function* reqStatusID(){
  yield takeEvery(actions.REQ_STID_REQUEST, function*({payload}){
    const param = {
      AD_Client_ID: payload.AD_Client_ID,
      IsActive: payload.IsActive,
      R_StatusCategory_ID: payload.R_StatusCategory_ID,
      IsOpen: payload.IsOpen

    }
    const result = yield call(ReqHelper.getReqSTID, param)
    if(result && !result.error) {
      const data = {
        CreatedBy: payload.CreatedBy,
        UpdatedBy: payload.UpdatedBy,
        AD_Org_ID: payload.AD_Org_ID,
        R_RequestType_ID: payload.R_RequestType_ID,
        Summary: payload.Summary,
        SalesRep_ID: payload.SalesRep_ID,
        R_Status_ID: result[0].R_Status_ID,
        C_BPartner_ID: payload.C_BPartner_ID,
        AD_User_ID: payload.AD_User_ID,
        C_Activity_ID: payload.C_Activity_ID,
        XX_Unit_ID: payload.XX_Unit_ID,
        AD_Table_ID: payload.AD_Table_ID,
        Record_ID: payload.Record_ID,
        Result: payload.Result,
        DateNextAction: payload.DateNextAction

      }
      yield put({
        type: actions.REQ_ADD_REQUEST,
        payload: data
      })
    }else{
      yield put({
        type: actions.REQ_ADD_ERROR,
        payload
      })
    }
  })
}

export function* reqAdd(){
  yield takeEvery(actions.REQ_ADD_REQUEST, function*({payload}){
    const param = Object.assign({}, payload);
    const result = yield call(ReqHelper.addReq, param)
    if(result && !result.error) {
      yield put({
        type: actions.REQ_ADD_SUCCESS,
        payload: result
      })
    }else{
      yield put({
        type: actions.REQ_ADD_ERROR,
        payload
      })
    }
  })
}

export default function* reqSaga() {
  yield all([
    fork(reqRequest), fork(reqTypeRequest), fork(reqStatusID), fork(reqAdd)
  ])
}