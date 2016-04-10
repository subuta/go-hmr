import { dom, element } from 'decca'
import DynamicScriptLoader from './components/DynamicScriptLoader';

var eventSource = new EventSource("/events")

eventSource.onmessage = function (ev) {
  const data = ev.data;
  if (data === 'sdk built') {
    console.log('sdk updated.');
    location.reload();
  } else if (data === 'built') {
    console.log('component updated.');
  }
};

eventSource.onopen = function (ev) {
  console.log('eventSource is open.')
}

eventSource.onerror = function (ev) {
  console.log("readyState = " + ev.currentTarget.readyState)
}

// Create an app that can turn vnodes into real DOM elements
var render = dom.createRenderer(document.querySelector('#dynamic-script'))

render(<DynamicScriptLoader message="test"/>)
