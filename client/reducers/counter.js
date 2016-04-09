const initialState = {
  counter: 0
}

export default function editor (state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {
        counter: state.counter + 1
      }
    default:
      return state
  }
}
