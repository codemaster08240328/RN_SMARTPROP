import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({ unitsuccess:null, unit:[], message:null, loading:null})
export function unitReducer(state = initState, action={}) {
  switch (action.type) {
    case actions.UNIT_REQUEST: 
      return {
          ...state,
          unitsuccess:null,
          loading:true,
      }
    case actions.UNIT_GET_SUCCESS:
      return {
          ...state,
          unitsuccess:true,
          unit:state.unit.concat(action.payload),
          message:'unit get succeed',
          loading:false
      }
    
    case actions.UNIT_GET_ERROR:
      return {
          ...state,
          unitsuccess:false,
          message:action.payload,
          loading:false,
      }
    default:
      return state
  }
}