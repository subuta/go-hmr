const createScriptNode = (filename) => {
  let node = document.createElement('script')
  node.setAttribute("type","text/javascript")
  node.setAttribute("src", filename)
  return node
}

export default (containerSelector, scriptUrl) => {
  const scriptContainerNode = document.querySelector(containerSelector);
  if (scriptContainerNode.firstChild) {
    scriptContainerNode.removeChild(scriptContainerNode.firstChild);
  }
  scriptContainerNode.appendChild(createScriptNode(scriptUrl));
}
