import { dom, element } from 'decca'
import _ from 'lodash'
import configureStore from 'store'
import CounterContainer from 'containers/Counter';
import PageContainer from 'containers/Page';

let store = configureStore()

let unSubscriber = _.noop;

// Create an app that can turn vnodes into real DOM elements
var render = dom.createRenderer(document.querySelector('#view'), store.dispatch)

const handleComponentRepositoryLoaded = function () {
  console.log('example/index.js [start]');

  const { Counter, TwoPaneLayout, Page } = window.componentRepository;
  const _Counter = CounterContainer(Counter);
  const _Page = PageContainer(Page);

  // retrieve latest app and render it.
  const update = function () {
    const pages = [
      {id: 1, title: 'page 1'},
      {id: 2, title: 'page 2'},
      {id: 3, title: 'page 3'}
    ];

    const app = (
      <TwoPaneLayout>
        {_.map(pages, page => {
          return <_Page title={page.title} id={page.id}/>
        })}
        <_Counter/>
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
