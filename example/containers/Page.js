import { element } from 'decca'

import * as PageActions from 'actions/page'

// Dispatch an action when the button is clicked
let selectPage = (dispatch, id) => event => {
  dispatch(PageActions.selectPage(id))
}

const Container = (Component) => {
  return {
    render ({ props, context, dispatch }) {
     return <Component selected={context.page.selected}
                       onClick={selectPage(dispatch, props.id)}
                       title={props.title}
                       id={props.id}/>
    }
  }
}

export default Container
