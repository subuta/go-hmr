import { element } from 'decca'

// Define a state-less component
const Counter = {
  render: ({ props }) => {
    return (<div>
      <button onClick={props.onClick}>Increment</button>
      <h1 style={{color: 'red'}}>{props.value}</h1>
    </div>)
  }
}

// Render the app tree
export default Counter
