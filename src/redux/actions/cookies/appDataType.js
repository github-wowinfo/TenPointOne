import * as AppDataTypes from '../../actionType/cookies/appDataType'

export const setAppMessages = payload => ({
  type: AppDataTypes.SET_APP_MESSAGES,
  payload
})

export const networkChange = payload => ({
  type: AppDataTypes.NETWORK_CHANGE,
  payload
})

export const globalFlag = payload => ({
  type: AppDataTypes.GLOBAL_FLAG,
  payload
})

export const globalFavFlag = payload => ({
  type: AppDataTypes.GLOBAL_FAV_FLAG,
  payload
})

export const globalAdrs = payload => ({
  type: AppDataTypes.GLOBAL_ADRS,
  payload
})

export const globalNickName = payload => ({
  type: AppDataTypes.GLOBAL_NICK_NAME,
  payload
})