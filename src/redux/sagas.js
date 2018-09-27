import { all } from "redux-saga/effects";
import authSaga from './auth/saga';
import imageSaga from './image/saga';
import profileSaga from './profile/saga';
import unitSaga from './unit/saga';
import reqSaga from './request/saga';
import listSaga from './list/saga';
import actSaga from './activity/saga'
export default function* rootSaga(getState) {
    yield all([authSaga(), imageSaga(), profileSaga(), unitSaga(), reqSaga(), listSaga(), actSaga()])
}