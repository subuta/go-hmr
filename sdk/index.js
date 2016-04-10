import rebuildScriptNode from './rebuildScriptNode';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const BUILD_EVENT = 'build';
var buildEvent = new Event(BUILD_EVENT);

// subscribe for events
var eventSource = new EventSource("/events")

const loadComponentRepository = (uniqueId = '') => {
  console.log('loadComponentRepository [start]');

  const scriptUrl = `/js/bundle.component-repository.js?_=${uniqueId}`
  // add script to dom.
  return rebuildScriptNode('#dynamic-script', scriptUrl).then((result) => {
    // when fully loaded.
    // trigger event for listener(client).
    document.body.dispatchEvent(buildEvent)
    console.log('loadComponentRepository [end]');
  })
}

eventSource.onmessage = function (ev) {
  const data = ev.data;
  if (data === 'built') {
    console.log('component updated.')
    loadComponentRepository(ev.lastEventId)
  }
};

eventSource.onopen = function (ev) {
  console.log('eventSource is open.')
}

eventSource.onerror = function (ev) {
  console.log("readyState = " + ev.currentTarget.readyState)
}

// fetch for first time rendering.
// fetch('/build').then(response => response)

// load once.
loadComponentRepository()
