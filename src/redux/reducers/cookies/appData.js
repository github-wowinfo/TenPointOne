import * as AppDataTypes from '../../actionType/cookies/appDataType'

const initialState = {
  appMessages: '',
  network: { icon: 'arg', name: 'Polygon Network' }
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

    default:
      return state
  }
}

export default appData