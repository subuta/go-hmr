import { element } from 'decca'

import * as CounterActions from 'actions/counter'

// Dispatch an action when the button is clicked
let increment = dispatch => event => {
  dispatch(CounterActions.incrementCounter())
}

const Container = (Component) => {
  return {
    render ({ context, dispatch }) {
     return <Component value={context.counter.counter}
                       onClick={increment(dispatch)}/>
    }
  }
}

export default Container
