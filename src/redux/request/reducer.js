import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({success:null, request:[], message:null, loading:null, reqtype:[]})
export function reqReducer(state = initState, action={}) {
  switch (action.type) {
    case actions.REQ_REQUEST: 
      return {
          ...state,
          success:null,
          loading:true,
          request:[]
      }
    case actions.REQ_GET_SUCCESS:
      return {
          ...state,
          success:true,
          request:action.payload,
          message:'request get succeed',
          loading:false
      }
    
    case actions.REQ_GET_ERROR:
      return {
          ...state,
          success:false,
          message:action.payload,
          loading:false,
      }
    case actions.REQ_TYPE_REQUEST:
      return {
        ...state,
        success: null,
        loading: true,
        reqtype: []
      }
    case actions.REQ_TYPE_SUCCESS:
      return {
        ...state,
        success: true,
        reqtype: action.payload,
        message: 'request type get succeed',
        loading: false
      }
    case actions.REQ_GET_ERROR:
      return {
        ...state,
        success: false,
        message: action.payload,
        loading: false
      }
    case actions.REQ_STID_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actions.REQ_ADD_SUCCESS:
      return {
        ...state,
        addsuccess: true,
        addmessage: 'Successfully added',
        loading: false
      }
    case actions.REQ_ADD_ERROR:
      return {
        ...state,
        addsuccess: false,
        addmessage: 'failed',
        loading: false
      }
    default:
      return state
  }
}