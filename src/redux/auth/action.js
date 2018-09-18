const actions = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    login: payload => ({
      type: actions.LOGIN_REQUEST,
      payload
    }),
    logout:() =>({
      type:actions.LOGOUT
    })

}

export default actions