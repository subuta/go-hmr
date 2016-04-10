const Counter = require('./components/Counter').default;
const Page = require('./components/Page').default;
const TwoPaneLayout = require('./components/TwoPaneLayout').default;

console.log('componentRepository loaded.');

// export componentRepository to global for client-side use.
window.componentRepository = {
  Counter,
  Page,
  TwoPaneLayout
};
