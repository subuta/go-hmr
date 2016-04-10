import { element } from 'decca'

const sideBarWidth = 120;

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'row'
  },

  left: {
    backgroundColor: '#eeeeee',
    height: '100vh',
    width: sideBarWidth
  },

  right: {
    padding: 16,
    backgroundColor: '#eeeeee',
    borderLeft: '1px solid #dddddd',
    height: '100vh',
    width: `calc(100vw - ${sideBarWidth}px)`
  }
};

// Define a state-less component
const TwoPaneLayout = {
  render: ({ props, children }) => {
    return (<div style={styles.layout}>
      <div style={styles.left}>
        {children[0]}
      </div>
      <div style={styles.right}>
        {children[1]}
      </div>
    </div>)
  }
}

// Render the app tree
export default TwoPaneLayout
