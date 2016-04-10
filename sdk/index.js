import rebuildScriptNode from './rebuildScriptNode';

// subscribe for events
var eventSource = new EventSource("/events")

eventSource.onmessage = function (ev) {
  const data = ev.data;
  if (data === 'sdk built') {
    console.log('sdk updated.');
    location.reload();
  } else if (data === 'built') {
    console.log('component updated.');
    const scriptUrl = `/js/bundle.components.js?_=${ev.lastEventId}`
    // add script to dom.
    rebuildScriptNode('#dynamic-script', scriptUrl)
  }
};

eventSource.onopen = function (ev) {
  console.log('eventSource is open.')
}

eventSource.onerror = function (ev) {
  console.log("readyState = " + ev.currentTarget.readyState)
}
