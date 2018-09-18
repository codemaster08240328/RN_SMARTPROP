const actions = {
    GET_USER:'GET_USER',
    GET_USER_ERROR:'GET_USER_ERROR',
    SET_USER:'SET_USER',
    PROFILE_UPDATE:'PROFILE_UPDATE',
    UPDATE_SUCCESS:'UPDATE_SUCCESS',
    UPDATE_ERROR:"UPDATE_ERROR",
    UPDATE_IMAGE:'UPDATE_IMAGE',
    GET_CODE:'GET_CODE',
    CODE_SUCCESS:'CODE_SUCCESS',
    CODE_ERROR:'CODE_ERROR',
    VERIFY_CODE:'VERIFY_CODE',
    VERIFY_SUCCESS:'VERIFY_SUCCESS',
    VERIFY_ERROR:'VERIFY_ERROR',
    getUser:payload=>({
        type:actions.GET_USER,
        payload
    }),
    update:payload => ({
        type:actions.PROFILE_UPDATE,
        payload
    }),
    getCode:payload => ({
        type:actions.GET_CODE,
        payload
    }),
    verifyCode:payload => ({
        type:actions.VERIFY_CODE,
        payload
    })

}

export default actions