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
  GET_UNIT_LEDGER: 'GET_UNIT_LEDGER',
  UNIT_LEDGER_SUCCESS: 'UNIT_LEDGER_SUCCESS',
  UNIT_LEDGER_ERROR: 'UNIT_LEDGER_ERROR',
  LOV_PROP_GET: 'LOV_PROP_GET',
  PROP_GET_SUCCESS: 'PROP_GET_SUCCESS',
  PROP_GET_ERROR: 'PROP_GET_ERROR',
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
  }),
  getUnitLedger: payload => ({
    type: actions.GET_UNIT_LEDGER,
    payload
  }),
  getPropID: payload => ({
    type: actions.LOV_PROP_GET,
    payload
  })

}

export default actions