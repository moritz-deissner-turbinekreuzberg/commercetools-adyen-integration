module.exports = {
  CTP_ADYEN_INTEGRATION: 'ctp-adyen-integration',
  CTP_PAYMENT_INTERACTION_CUSTOM_TYPE_KEY:
    'ctp-adyen-integration-interaction-payment-type',
  CTP_PAYMENT_CUSTOM_TYPE_KEY:
    'ctp-adyen-integration-web-components-payment-type',
  CTP_INTERACTION_TYPE_CANCEL_PAYMENT: 'cancelPayment',
  CTP_INTERACTION_TYPE_GET_PAYMENT_METHODS: 'getPaymentMethods',
  CTP_CUSTOM_FIELD_GET_PAYMENT_METHODS_RESPONSE: 'getPaymentMethodsResponse',
  CTP_INTERACTION_TYPE_MAKE_PAYMENT: 'makePayment',
  CTP_CUSTOM_FIELD_MAKE_PAYMENT_RESPONSE: 'makePaymentResponse',
  CTP_INTERACTION_TYPE_SUBMIT_ADDITIONAL_PAYMENT_DETAILS:
    'submitAdditionalPaymentDetails',
  CTP_CUSTOM_FIELD_SUBMIT_ADDITIONAL_PAYMENT_DETAILS_RESPONSE:
    'submitAdditionalPaymentDetailsResponse',
  CTP_INTERACTION_TYPE_MANUAL_CAPTURE: 'manualCapture',
  CTP_INTERACTION_TYPE_REFUND: 'refund',

  PAYMENT_METHOD_TYPE_KLARNA_METHODS: [
    'klarna',
    'klarna_paynow',
    'klarna_account',
  ],

  PAYMENT_METHOD_TYPE_AFFIRM_METHODS: ['affirm'],
  CTP_CARBON_OFFSET_COSTS_RESPONSE: 'getCarbonOffsetCostsResponse',
  CTP_INTERACTION_TYPE_GET_CARBON_OFFSET_COSTS: 'getCarbonOffsetCosts',
}
