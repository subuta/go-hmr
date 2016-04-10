import { combineReducers } from 'redux'
import counter from 'reducers/counter'
import page from 'reducers/page'

const rootReducer = combineReducers({
  counter,
  page
})

export default rootReducer
