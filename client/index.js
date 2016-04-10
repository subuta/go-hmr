import { dom, element } from 'decca'
import _ from 'lodash'
import configureStore from 'store'
import CounterContainer from 'containers/Counter';

const BUILD_EVENT = 'build';

let store = configureStore()

let unSubscriber = _.noop;

// Create an app that can turn vnodes into real DOM elements
var render = dom.createRenderer(document.querySelector('#view'), store.dispatch)

// Listen for the build event that will published by sdk.
document.body.addEventListener(BUILD_EVENT, function (e) {
  console.log('client/index.js [start]');

  // if not yet componentRepository registered
  if (!window.componentRepository) return false;

  const { Counter } = window.componentRepository;
  const WCounter = CounterContainer(Counter);

  // retrieve latest app and render it.
  const update = function () {
    render(<WCounter/>, store.getState())
    console.log('client/index.js [update]');
  }

  unSubscriber()
  unSubscriber = store.subscribe(update)

  // render initial state.
  update()
  console.log('client/index.js [end]');
}, false);
