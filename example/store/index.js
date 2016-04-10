import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from 'reducers'

export default function configureStore (initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    // call devTools if browser's redux-devtools extension enabled.
    window.devToolsExtension ? window.devToolsExtension({name: 'go-hmr'}) : f => f
  ))

//  if (module.hot) {
//    // Enable Webpack hot module replacement for reducers
//    module.hot.accept('reducers', () => {
//      const nextReducer = require('reducers')
//      store.replaceReducer(nextReducer)
//    })
//  }

  return store
}
