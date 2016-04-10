import { element } from 'decca'

const styles = {
  Button: {
    // border: 'none'
  }
}

// Define a state-less component
const Counter = {
  render: ({ props }) => {
    return (<div>
      <button onClick={props.onClick}
              style={styles.Button}>
        Increment
      </button>
      <h1 style={{color: 'green'}}>{props.value}</h1>
    </div>)
  }
};

// Render the app tree
export default Counter
