import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({success: null, activity:null, message:null, loading:null})

export function actReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.ACT_REQUEST:
            return {
                ...state,
                activity:[],
                success:null,
                loading:true
            }
        case actions.ACT_GET_SUCCESS:
            return {
              ...state,
              activity: action.payload,
              success:true,
              loading:false
            }
        case actions.ACT_GET_ERROR:
            return {
              ...state,
              success:false,
              loading:false,
              message:action.error
            }    
        default:
            return state
    }
}