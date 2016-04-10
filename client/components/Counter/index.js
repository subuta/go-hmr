import { element } from 'decca'
import Contain from './contain'

// Define a state-less component
const Counter = {
  render: ({ props }) => {
    return (<div>
      <button onClick={props.onClick}>Increment</button>
      <h1>{props.value}</h1>
    </div>)
  }
}

// Render the app tree
export default Contain(Counter)
