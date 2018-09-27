const actions = {
  LIST_REQUEST: "LIST_REQUEST",
  LIST_GET_SUCCESS: "LIST_GET_SUCCESS",
  LIST_GET_ERROR: "LIST_GET_ERROR",
  getList: payload => ({
    type: actions.LIST_REQUEST,
    payload
  })
}

export default actions