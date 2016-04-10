import { element } from 'decca'
import _ from 'lodash';

const styles = {
  Page: {
    cursor: 'pointer'
  },

  SelectedPage: {
    backgroundColor: '#cccccc',
    cursor: 'pointer'
  }
};

// Define a state-less component
const Menus = {
  render: ({ props }) => {
    const isSelected = props.selected == props.id

    return (
      <div style={isSelected ? styles.SelectedPage : styles.Page} onClick={props.onClick}>
        {props.title}
      </div>
    )
  }
}

// Render the app tree
export default Menus
