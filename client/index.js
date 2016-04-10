import { dom, element } from 'decca'
import _ from 'lodash'
import configureStore from 'store'
import * as CounterActions from 'actions/counter'
import CounterContainer from 'containers/Counter';

const BUILD_EVENT = 'build';

// Listen for the build event that will published by sdk.
document.body.addEventListener(BUILD_EVENT, function (e) {
  // if not yet componentRepository registered
  if (!window.componentRepository) return false;
  let store = configureStore()

  // Create an app that can turn vnodes into real DOM elements
  var render = dom.createRenderer(document.querySelector('#view'), store.dispatch)

  const { Counter } = window.componentRepository;
  const WCounter = CounterContainer(Counter);

  // retrieve latest app and render it.
  var update = function () {
    render(<WCounter/>, store.getState())
  }

  store.subscribe(_.debounce(update, 0, {}))

  // render initial state.
  update()
}, false);
