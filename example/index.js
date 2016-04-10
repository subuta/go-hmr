import { dom, element } from 'decca'
import _ from 'lodash'
import configureStore from 'store'
import CounterContainer from 'containers/Counter';

let store = configureStore()

let unSubscriber = _.noop;

// Create an app that can turn vnodes into real DOM elements
var render = dom.createRenderer(document.querySelector('#view'), store.dispatch)

const handleComponentRepositoryLoaded = function () {
  console.log('example/index.js [start]');

  const { Counter, TwoPaneLayout } = window.componentRepository;
  const WCounter = CounterContainer(Counter);

  // retrieve latest app and render it.
  const update = function () {
    const app = (
      <TwoPaneLayout>
        <h1>label</h1>
        <WCounter/>
      </TwoPaneLayout>
    )
    render(app, store.getState())
    console.log('example/index.js [update]');
  }

  unSubscriber()
  unSubscriber = store.subscribe(update)

  // render initial state.
  update()
  console.log('example/index.js [end]');
}

// Listen for the build event that will published by sdk.
window.onLoadComponentRepository(handleComponentRepositoryLoaded);
