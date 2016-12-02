import { fetchAddCallRecord } from 'actions/common'

/**
 * 若在通话过程中，切换到部分页面，需要添加通话记录
 *
 * @param params
 *        - keys
 *          - {String|Number} id
 *          - {String|Number} operAct 配送员详情、商家详情为6，订单详情为5
 *          - {String|Number} entityType 配送员详情为2，商家详情为1，订单详情为3
 * @param context， 一般传入this.props
 * @returns {Function}
 */
export default (params, context) => {
  if (sessionStorage.getItem(('onLinkCTI'))) {
    params.callId = sessionStorage.getItem('callId')
    params.detail = params.id
    params.entityId = params.id

    if (sessionStorage.getItem('isCallIn') === 'true') {
      setTimeout(() => {
        params.callId = sessionStorage.getItem('callId')
        params.callId && context.dispatch(fetchAddCallRecord(params))
      }, 1000)
    } else {
      params.callId && context.dispatch(fetchAddCallRecord(params))
    }
  }
}
