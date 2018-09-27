import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({success:null, list:[], message:null, loading:null})
export function listReducer(state = initState, action={}) {
  switch (action.type) {
    case actions.LIST_REQUEST: 
      return {
          ...state,
          success:null,
          loading:true,
          list:[]
      }
    case actions.LIST_GET_SUCCESS:
      return {
          ...state,
          success:true,
          list:action.payload,
          message:'request get succeed',
          loading:false
      }
    
    case actions.LIST_GET_ERROR:
      return {
          ...state,
          success:false,
          message:action.payload,
          loading:false,
      }
    default:
      return state
  }
}