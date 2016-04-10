import { element } from 'decca'

// Define a state-less component
const Counter = {
  render: ({ props }) => {
    return (<div>
      <button onClick={props.onClick}>Increment</button>
      <h2 style={{color: 'red'}}>{props.value}</h2>
    </div>)
  }
}

// Render the app tree
export default Counter
