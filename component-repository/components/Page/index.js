import { element } from 'decca'
import _ from 'lodash';
import color from 'color';

const styles = {
  Page: {
    cursor: 'pointer',
    padding: '4px 16px'
  },

  SelectedPage: {
    backgroundColor: '#cccccc',
    cursor: 'pointer',
    padding: '4px 16px'
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
