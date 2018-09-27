const actions = {
  REQ_REQUEST: "REQ_REQUEST",
  REQ_GET_SUCCESS: "REQ_GET_SUCCESS",
  REQ_GET_ERROR: "REQ_GET_ERROR",
  REQ_TYPE_REQUEST: "REQ_TYPE_REQUEST",
  REQ_TYPE_SUCCESS: "REQ_TYPE_SUCCESS",
  REQ_TYPE_ERROR: "REQ_TYPE_ERROR",
  REQ_STID_REQUEST: "REQ_STID_REQUEST",
  REQ_ADD_SUCCESS: "REQ_ADD_SUCCESS",
  REQ_ADD_ERROR: "REQ_ADD_ERROR",
  REQ_ADD_REQUEST: "REQ_ADD_REQUEST",
  getReq: payload => ({
    type: actions.REQ_REQUEST,
    payload
  }),
  getReqType: payload => ({
    type: actions.REQ_TYPE_REQUEST,
    payload
  }),
  getReqStatusID: payload => ({
    type: actions.REQ_STID_REQUEST,
    payload
  })
}

export default actions