const actions = {
  ACT_REQUEST: "ACT_REQUEST",
  ACT_GET_SUCCESS: "ACT_GET_SUCCESS",
  ACT_GET_ERROR: "ACT_GET_ERROR",
  getActivity: payload => ({
    type: actions.ACT_REQUEST,
    payload
  })
}

export default actions