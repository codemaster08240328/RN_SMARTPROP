import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({ unitsuccess:null, unit:[], message:null, loading:null, doc:[], docCategory:[]})
export function unitReducer(state = initState, action={}) {
  switch (action.type) {
    case actions.UNIT_REQUEST: 
      return {
          ...state,
          unitsuccess:null,
          loading:true,
          unit:[],
          doc:[]
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
    case actions.UNIT_DOC_REQUEST:
      return {
        ...state,
        loading:true,
        doc:[]
      }
    case actions.DOC_SUCCESS:
      return {
        ...state,
        loading:false,
        doc:action.payload
      }
    case actions.DOC_ERROR:
      return {
        ...state,
        loading:false,
        message:action.payload
      }
    case actions.DOC_CATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case actions.DOC_CATE_SUCCESS:
      return {
        ...state,
        loading: false,
        docCategory: action.payload,
      }
    case actions.DOC_CATE_ERROR:
      return {
        ...state,
        loading: false,
        message: 'error'
      }
    case actions.ADD_DOC_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'success'
      }
    case actions.ADD_DOC_ERROR:
      return{
        ...state,
        loading: false,
        message: 'error'
      }
    default:
      return state
  }
}