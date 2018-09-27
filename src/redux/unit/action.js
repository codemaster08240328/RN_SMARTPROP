const actions = {
  UNIT_REQUEST: "UNIT_REQUEST",
  UNIT_GET_SUCCESS: "UNIT_GET_SUCCESS",
  UNIT_GET_ERROR: "UNIT_GET_ERROR",
  LOV_UNIT_GET: 'LOV_UNIT_GET',
  UNIT_DOC_REQUEST: 'UNIT_DOC_REQUEST',
  DOC_SUCCESS: 'DOC_SUCCESS',
  DOC_ERROR: 'DOC_ERROR',
  DOC_CATE_REQUEST: 'DOC_CATE_REQUEST',
  DOC_CATE_SUCCESS: 'DOC_CATE_SUCCESS',
  DOC_CATE_ERROR: 'DOC_CATE_ERROR',
  ADD_UNIT_DOC: 'ADD_UNIT_DOC',
  ADD_DOC_SUCCESS: 'ADD_DOC_SUCCESS',
  ADD_DOC_ERROR: 'ADD_DOC_ERROR',
  getUnit: payload => ({
    type: actions.UNIT_REQUEST,
    payload
  }),
  getUnitDoc: payload=> ({
    type: actions.UNIT_DOC_REQUEST,
    payload
  }),
  getDocCategory: payload => ({
    type: actions.DOC_CATE_REQUEST,
    payload
  }),
  addUnitDoc: payload => ({
    type: actions.ADD_UNIT_DOC,
    payload
  })

}

export default actions