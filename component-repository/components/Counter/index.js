import { element } from 'decca'

// Define a state-less component
const Counter = {
  render: ({ props }) => {
    return (<div>
      <button onClick={props.onClick}>Increment</button>
      <h3 style={{color: 'blue'}}>{props.value}</h3>
    </div>)
  }
};

// Render the app tree
export default Counter
