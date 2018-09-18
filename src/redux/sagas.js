import { all } from "redux-saga/effects"
import authSaga from './auth/saga';
import imageSaga from './image/saga';
import profileSaga from './profile/saga';
export default function* rootSaga(getState) {
    yield all([authSaga(),imageSaga(),profileSaga()])
}