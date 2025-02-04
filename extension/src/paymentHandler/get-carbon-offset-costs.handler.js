const pU = require('./payment-utils')
const c = require('../config/constants')
const { getCarbonOffsetCosts } = require('../service/web-component-service')

async function execute(paymentObject) {
  const getCarbonOffsetCostsRequestObj = JSON.parse(
    paymentObject.custom.fields.getCarbonOffsetCostsRequest
  )
  const adyenMerchantAccount = paymentObject.custom.fields.adyenMerchantAccount
  const { request, response } = await getCarbonOffsetCosts(
    adyenMerchantAccount,
    getCarbonOffsetCostsRequestObj
  )
  return {
    actions: [
      pU.createAddInterfaceInteractionAction({
        request,
        response,
        type: c.CTP_INTERACTION_TYPE_GET_CARBON_OFFSET_COSTS,
      }),
      pU.createSetCustomFieldAction(
        c.CTP_CARBON_OFFSET_COSTS_RESPONSE,
        response
      ),
    ],
  }
}

module.exports = { execute }
