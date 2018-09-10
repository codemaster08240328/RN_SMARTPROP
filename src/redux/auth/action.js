const actions = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    GET_USER:'GET_USER',
    login: payload => ({
      type: actions.LOGIN_REQUEST,
      payload
    })
}

export default actions