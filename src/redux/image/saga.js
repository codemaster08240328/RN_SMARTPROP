import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import ImageHelper from '../../service/image';

export function *getImage(){
    yield takeEvery(actions.GET_IMAGE, function* ({payload}){
        const result = yield call(ImageHelper.getImage, payload)
        if(result && !result.error){
            yield put({
                type:actions.SET_IMAGE,
                payload:result
            })
        }else{
            yield put({
                type:actions.GET_IMAGE_ERROR,
                payload:result.error
            })
        }

    })
}

// export function *updateImage(){
//     yield takeEvery(actions.UPDATE_IMAGE, function* ({payload}){
//         const userInfo = payload
//         const result = yield call(AuthHelper.updateProfile, userInfo)

//         console.log("result~~~~~~~~~",result);
//         if(result && !result.error){
//             yield put({
//                 type:actions.UPDATE_SUCCESS,
//                 payload:"PROFILE UPDATE SUCCESS"
//             })
//         }else{
//             yield put({
//                 type:actions.UPDATE_ERROR,
//                 payload:result.error
//             })
//         }
//     })
// }


export function *uploadImage(){
    yield takeEvery(actions.UPLOAD_IMAGE, function *({payload}){
        const image = payload
        const result = yield call(ImageHelper.uploadImage, image)
        console.log("---------------", result);
        if(result && !result.error){
            data = {
                BinaryData:image.BinaryData,
                Name:result.Name,
                AD_Image_ID:result.AD_Image_ID,
                AD_Client_ID:result.AD_Client_ID
            }
            yield put({
                type:actions.IMAGE_SUCCESS,
                payload:data
            })
            // data = {
            //     AD_User_ID:result.AD_Client_ID,
            //     AD_Image_ID:result.AD_Image_ID
            // }
            // yield put({
            //     type:actions.PROFILE_UPDATE,
            //     payload:data
            // })
        }else{
            yield put({
                type:actions.IMAGE_ERROR,
                payload:result.error
            })
        }
    })
}
export function* successImage(){
    yield takeEvery(actions.IMAGE_SUCCESS, function* ({payload}){
        console.log('called~~~~~~~');
        data = {
            AD_User_ID:payload.AD_Client_ID,
            AD_Image_ID:payload.AD_Image_ID
        }
        yield put({
            type:actions.UPDATE_IMAGE,
            payload:data
        })
    })
}






export default function* imageSaga() {
    yield all([
        fork(getImage), fork(uploadImage), fork(successImage)//, fork(updateImage)
    ])
}