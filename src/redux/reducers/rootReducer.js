// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import appData from './cookies/appData'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  appData
})

export default rootReducer
