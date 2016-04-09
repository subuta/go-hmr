import { dom, element } from 'decca'
import _ from 'lodash'
import configureStore from 'store'
import Counter from 'components/Counter'
import * as CounterActions from 'actions/counter'

// Create a Redux store to handle all UI actions and side-effects
let store = configureStore()

var eventSource = new EventSource("/events")

eventSource.onmessage = function () {
  console.log('here!!!');
  store.dispatch(CounterActions.incrementCounter())
}

eventSource.onopen = function (ev) {
  console.log('open!')
}

eventSource.onerror = function (ev) {
  console.log("readyState = " + ev.currentTarget.readyState)
}

// Create an app that can turn vnodes into real DOM elements
var render = dom.createRenderer(document.querySelector('#view'), store.dispatch)

// retrieve latest app and render it.
var update = function () {
  render(<Counter/>, store.getState())
}

store.subscribe(_.debounce(update, 0, {}))

// render initial state.
update()
