const actions = {
  LIST_REQUEST: "LIST_REQUEST",
  LIST_GET_SUCCESS: "LIST_GET_SUCCESS",
  LIST_GET_ERROR: "LIST_GET_ERROR",
  ADD_LIST: 'ADD_LIST',
  ADD_SUCCESS: 'ADD_SUCCESS',
  ADD_FAIL: 'ADD_FAIL',
  getList: payload => ({
    type: actions.LIST_REQUEST,
    payload
  }),
  addList: payload => ({
    type: actions.ADD_LIST,
    payload
  })
}

export default actions