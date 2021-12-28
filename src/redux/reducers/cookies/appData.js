import * as AppDataTypes from '../../actionType/cookies/appDataType'

const initialState = {
  appMessages: '',
  network: { icon: 'eth', name: 'Ethereum' },
  accAdrs: '',
  globalFlag: false,
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

    case AppDataTypes.GLOBAL_ADRS: {
      return {
        ...state,
        global_adrs: payload,
      }
    }

    case AppDataTypes.GLOBAL_NICK_NAME: {
      return {
        ...state,
        global_adrs: payload,
      }
    }
    default:
      return state
  }
}

export default appData