const actions = {
  UNIT_REQUEST: "UNIT_REQUEST",
  UNIT_GET_SUCCESS: "UNIT_GET_SUCCESS",
  UNIT_GET_ERROR: "UNIT_GET_ERROR",
  LOV_UNIT_GET: 'LOV_UNIT_GET',
  getUnit: payload => ({
    type: actions.UNIT_REQUEST,
    payload
  })

}

export default actions