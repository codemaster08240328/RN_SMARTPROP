import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({ successful: null, image:null, message:null, loading:null, uploadloading:null, uploadsuccess:null })
export function imageReducer(state = initState, action={}) {
    switch (action.type) {
       
        case actions.UPLOAD_IMAGE:
            return {
                ...state,
                uploadloading:true,
                message:'image uploading...'
            }
        case actions.GET_IMAGE:
            return {
                ...state,
                loading:true,
                message:'getting user image'
            }
        case actions.SET_IMAGE:
            return{
                ...state,
                image:action.payload,
                loading:false,
                successful:true
            }
        case actions.GET_IMAGE_ERROR:
            return {
                ...state,
                loading:false,
                successful:false,
                message:action.payload
            }
      
        case actions.IMAGE_SUCCESS:
            return {
                ...state,
                uploadsuccess:true,
                uploadloading:false,
                image:action.payload,
                message:'image successfully uploaded.'
            }
        case actions.IMAGE_ERROR:
            return {
                ...state,
                uploadsuccess:false,
                uploadloading:false,
                message:'image uploading Error.'
            }
    
        default:
            return state
    }
}