import rebuildScriptNode from './rebuildScriptNode';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const BUILD_EVENT = 'build';
var buildEvent = new Event(BUILD_EVENT);

// subscribe for events
var eventSource = new EventSource("/events")

const createBundleScripts = (uniqueId = '') => {
  const scriptUrl = `/js/bundle.component-repository.js?_=${uniqueId}`
  // add script to dom.
  rebuildScriptNode('#dynamic-script', scriptUrl)
}

eventSource.onmessage = function (ev) {
  const data = ev.data;
  if (data === 'built') {
    console.log('component updated.')
    createBundleScripts(ev.lastEventId)

    // trigger event for listener(client).
    document.body.dispatchEvent(buildEvent)
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

createBundleScripts()
