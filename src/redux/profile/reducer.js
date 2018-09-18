import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({ successful: null, user:null, message:null, loading:null, updatesuccess:null, updateloading:null})
const veri_initState = Immutable({ getting: null, result:null, message:null, getting_success:null, verifying:null, verifysuccess:null})
export function userReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.GET_USER:
            return {
                ...state,
                loading:true,
                message:'getting user data'
            }
         case actions.SET_USER:
            return {
                ...state,
                successful:true,
                loading:false,
                user:action.payload,
                message:'user data getting success'
            }       
        case actions.GET_USER_ERROR:
            return {
                ...state,
                successful:false,
                loading:false,
                message:action.payload
            }
        case actions.PROFILE_UPDATE:
            return {
                ...state,
                updateloading:true,
                message:'updating user profile'
            }

        case actions.UPDATE_SUCCESS:
            return {
                ...state,
                updatesuccess:true,
                updateloading:false,
                message:action.payload
            }
            
        case actions.UPDATE_ERROR:
            return {
                ...state,
                updatesuccess:false,
                updateloading:false,
                message:action.payload
            }
        default:
            return state
    }
}

export function veriReducer(state=veri_initState, action={}){
    switch(action.type){
        case actions.GET_CODE:
            return{
                ...state,
                getting:true,
                getting_success:null,
                verifying:null,
                verifysuccess:null
            }
        case actions.CODE_SUCCESS:
            return{
                ...state,
                getting:false,
                getting_success:true,
                result:action.payload,
                message:action.payload.message
            }
        case actions.CODE_ERROR:
            return{
                ...state,
                getting:false,
                getting_success:false,
                message:action.payload
            }
        case actions.VERIFY_CODE:
            return{
                ...state,
                verifying:true,

            }
        case actions.VERIFY_SUCCESS:
            return{
                ...state,
                verifying:false,
                verifysuccess:true,
                message:action.payload.message,
                result:action.payload
        

            }
        case actions.VERIFY_ERROR:
            return{
                ...state,
                verifying:false,
                verifysuccess:false,
                message:action.payload
            }
        
        default:
            return state

    }
    
}