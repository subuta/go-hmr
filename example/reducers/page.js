const initialState = {
  selected: 1
}

export default function page (state = initialState, action) {
  switch (action.type) {
    case 'SELECT_PAGE':
      return {
        selected: action.id
      };
    default:
      return state
  }
}
