import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ loginsuccess: null, user:null, message:null, loading:null })
export function authReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loginsuccess:true,
                user:action.payload,
                loading:false
            }
        case actions.LOGIN_ERROR:
            return {
                ...state,
                loginsuccess:false,
                message:action.payload,
                loading:false,
            }
        case actions.LOGOUT:
            return initState
        default:
            return state
    }
}