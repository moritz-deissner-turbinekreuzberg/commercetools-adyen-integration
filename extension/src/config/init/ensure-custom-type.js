const { createSyncTypes } = require('@commercetools/sync-actions')
const { serializeError } = require('serialize-error')
const utils = require('../../utils')

const mainLogger = utils.getLogger()

const paymentCustomType = require('../../../resources/web-components-payment-type.json')
const interfaceInteractionType = require('../../../resources/payment-interface-interaction-type.json')

async function ensurePaymentCustomType(ctpClient, ctpProjectKey) {
  return syncCustomType(
    ctpClient,
    createChildLogger(ctpProjectKey),
    paymentCustomType
  )
}

async function ensureInterfaceInteractionCustomType(ctpClient, ctpProjectKey) {
  return syncCustomType(
    ctpClient,
    createChildLogger(ctpProjectKey),
    interfaceInteractionType
  )
}

function createChildLogger(ctpProjectKey) {
  return mainLogger.child({
    commercetools_project_key: ctpProjectKey,
  })
}

function excludeChangeFieldDefinitionOrderUpdateAction(updateActions) {
  /*
    FieldNames attribute in specified update action is always a list of object, which is not accepted by
    Commercetools platform and leads to 400 HTTP error.
  */
  return updateActions.filter(
    (actionItem) => actionItem.action !== 'changeFieldDefinitionOrder'
  )
}

async function syncCustomType(ctpClient, logger, typeDraft) {
  try {
    const existingType = await fetchTypeByKey(ctpClient, typeDraft.key)
    if (existingType === null) {
      await ctpClient.create(ctpClient.builder.types, typeDraft)
      logger.info(`Successfully created the type (key=${typeDraft.key})`)
    } else {
      const syncTypes = createSyncTypes()
      const updateActions = syncTypes.buildActions(typeDraft, existingType)
      const filteredUpdateActions =
        excludeChangeFieldDefinitionOrderUpdateAction(updateActions)
      if (filteredUpdateActions.length > 0) {
        await ctpClient.update(
          ctpClient.builder.types,
          existingType.id,
          existingType.version,
          filteredUpdateActions
        )
        logger.info(`Successfully updated the type (key=${typeDraft.key})`)
      }
    }
  } catch (err) {
    throw Error(
      `Failed to sync payment type (key=${typeDraft.key}). ` +
        `Error: ${JSON.stringify(serializeError(err))}`
    )
  }
}

async function fetchTypeByKey(ctpClient, key) {
  try {
    const { body } = await ctpClient.fetchByKey(ctpClient.builder.types, key)
    return body
  } catch (err) {
    if (err.statusCode === 404) return null
    throw err
  }
}

module.exports = {
  ensurePaymentCustomType,
  ensureInterfaceInteractionCustomType,
}
