const Counter = require('./components/Counter').default;

console.log('componentRepository loaded.');

// export componentRepository to global for client-side use.
window.componentRepository = {
  Counter
};
