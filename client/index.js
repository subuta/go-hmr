import rebuildScriptNode from './rebuildScriptNode';
import _ from 'lodash';
require('es6-promise').polyfill();
require('isomorphic-fetch');

// subscribe for events
var eventSource = new EventSource("/events")

// custom endpoint should implement this method.
window.onLoadComponentRepository = (func) => {
  if (!window.componentRepositoryLoadListeners) {
    window.componentRepositoryLoadListeners = [];
  }
  window.componentRepositoryLoadListeners.push(func);
}

const loadComponentRepository = (uniqueId = '') => {
  console.log('loadComponentRepository [start]');

  const scriptUrl = `/js/bundle.component-repository.js?_=${uniqueId}`
  // add script to dom.
  return rebuildScriptNode('#dynamic-script', scriptUrl).then((result) => {
    // when fully loaded.
    // trigger event for listener(client).
    _.each(window.componentRepositoryLoadListeners, listener => {
      listener(result);
    })
    console.log('loadComponentRepository [end]');
  })
}

eventSource.onmessage = function (ev) {
  const data = ev.data;
  if (data === 'built') {
    console.log('component updated.')
    loadComponentRepository(ev.lastEventId)
  } else if (data === 'full-built') {
    console.log('will full reload.')
    location.reload();
  }
};

eventSource.onopen = function (ev) {
  console.log('eventSource is open.')
}

eventSource.onerror = function (ev) {
  console.log("readyState = " + ev.currentTarget.readyState)
}

// load once.
loadComponentRepository()
