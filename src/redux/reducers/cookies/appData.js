import * as AppDataTypes from '../../actionType/cookies/appDataType'

const initialState = {
  appMessages: ''
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

    default:
      return state
  }
}

export default appData