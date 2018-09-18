import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import ProfileHelper from '../../service/profile';

export function *getUser(){
    yield takeEvery(actions.GET_USER, function* ({payload}){
        const userInfo = Object.assign({},payload);
        const result = yield call(ProfileHelper.getUsers, userInfo)
        if(result && !result.error){
            yield put({
                type:actions.SET_USER,
                payload:result
            })
           
        }else{
            yield put({
                type:actions.GET_USER_ERROR,
                payload:result.error
            })
        }
    })
}

export function *updateProfile(){
    yield takeEvery(actions.PROFILE_UPDATE, function* ({payload}){
        const userInfo = Object.assign({}, payload);
        console.log('payload', userInfo);
        const result = yield call(ProfileHelper.updateProfile, userInfo)

        console.log("result~~~~~~~~~",result);
        if(result && !result.error){
            yield put({
                type:actions.UPDATE_SUCCESS,
                payload:"PROFILE UPDATE SUCCESS"
            })
            data = {
                EMail:userInfo.EMail
            }
            yield put({
                type:actions.GET_USER,
                payload:data
            })
        }else{
            yield put({
                type:actions.UPDATE_ERROR,
                payload:result.error
            })
        }
    })
}

export function *updateImage(){
    yield takeEvery(actions.UPDATE_IMAGE, function* ({payload}){
        const userInfo = Object.assign({}, payload);
        console.log('payload', userInfo);
        const result = yield call(ProfileHelper.updateProfile, userInfo)

        console.log("result~~~~~~~~~",result);
        if(result && !result.error){
            yield put({
                type:actions.UPDATE_SUCCESS,
                payload:"PROFILE UPDATE SUCCESS"
            })
        }else{
            yield put({
                type:actions.UPDATE_ERROR,
                payload:result.error
            })
        }
    })
}

export function *getCODE(){
    yield takeEvery(actions.GET_CODE, function*({payload}){
        const data = Object.assign({},payload);
        console.log(payload);
        const result = yield call(ProfileHelper.getCode, data)

        if(result && !result.errors){
            yield put({
                type:actions.CODE_SUCCESS,
                payload:result
            })
        }else{
            yield put({
                type:actions.CODE_ERROR,
                payload:result.message
            })
        }
    })
}

export function *verifyCode(){
    yield takeEvery(actions.VERIFY_CODE, function*({payload}){
        const data = Object.assign({}, payload);
        console.log(payload);
        const result = yield call(ProfileHelper.verifyCode, data)
        if(result && !result.errors){
            yield put({
                type:actions.VERIFY_SUCCESS,
                payload:result
            })
        }else{
            yield put({
                type:actions.VERIFY_ERROR,
                payload:result.message
            })
        }
    })
}

export default function* profileSaga() {
    yield all([
        fork(getUser), fork(updateProfile), fork(updateImage), fork(getCODE), fork(verifyCode)
    ])
}