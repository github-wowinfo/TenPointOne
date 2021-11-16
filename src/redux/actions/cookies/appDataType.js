import * as AppDataTypes from '../../actionType/cookies/appDataType'

export const setAppMessages = payload => ({
  type: AppDataTypes.SET_APP_MESSAGES,
  payload
})

export const networkChange = payload => ({
  type: AppDataTypes.NETWORK_CHANGE,
  payload
})