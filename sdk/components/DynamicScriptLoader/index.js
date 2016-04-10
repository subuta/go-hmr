import { element } from 'decca'

// Define a state-less component
const DynamicScriptLoader = {
  render: ({ props }) => {
    return (<div>
      { props.message }
    </div>)
  }
}

// Render the app tree
export default DynamicScriptLoader
