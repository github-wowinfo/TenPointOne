import * as AppDataTypes from '../../actionType/cookies/appDataType'

const initialState = {
  appMessages: '',
  network: { icon: 'eth', name: 'Ethereum' },
  globalFlag: false,
  globalFavFlag: 0,
  globalAdrs: '',
  globalNickName: ''
}

const appData = (state = initialState, action) => {
  const { payload, type, } = action

  switch (type) {

    case AppDataTypes.SET_APP_MESSAGES: {
      return {
        ...state,
        appMessages: payload,
      }
    }

    case AppDataTypes.NETWORK_CHANGE: {
      return {
        ...state,
        network: payload,
      }
    }

    case AppDataTypes.GLOBAL_FLAG: {
      return {
        ...state,
        globalFlag: payload,
      }
    }

    case AppDataTypes.GLOBAL_FAV_FLAG: {
      return {
        ...state,
        globalFavFlag: payload,
      }
    }

    case AppDataTypes.GLOBAL_ADRS: {
      return {
        ...state,
        globalAdrs: payload,
      }
    }

    case AppDataTypes.GLOBAL_NICK_NAME: {
      return {
        ...state,
        globalNickName: payload,
      }
    }

    default:
      return state
  }
}

export default appData