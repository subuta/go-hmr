require('es6-promise').polyfill();

const createScriptNode = (filename) => {
  let node = document.createElement('script')
  node.setAttribute("type","text/javascript")
  node.setAttribute("src", filename)
  return node
}

export default (containerSelector, scriptUrl) => {
  return new Promise((resolve, reject) => {
    const scriptContainerNode = document.querySelector(containerSelector);
    if (scriptContainerNode.firstChild) {
      scriptContainerNode.removeChild(scriptContainerNode.firstChild);
    }
    let scriptNode = createScriptNode(scriptUrl);

    // bind event handlers
    scriptNode.onload = function() {
      resolve('script loaded')
    };

    scriptNode.onerror = function() {
      reject('script load failed')
    };

    scriptContainerNode.appendChild(scriptNode);
  })
}
