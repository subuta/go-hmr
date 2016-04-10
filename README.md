### Go HMR example
Browser Hot Module Reload example using JS / Go technologies(for my study)
- Go
- Echo
- Babel.js
- Browserify
 - watchify
 - babelify
 
### Sequence of the hmr
1. change component(component-repository)
2. watchify detects code changes and re-builds and bundle sources using Babel.js(babelify)
3. Go(notify) detects bundle changes at /public/js and then send `build` events to client(Server Sent Events).
4. client receive `build` events and then try to reload entire `bundle.component-repository.js`
5. after components(bundle.component-repository) loaded successfully, `example.index.js` re-renders deku with current state.
6. all done :)
