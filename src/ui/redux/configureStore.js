import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
// import { routerMiddleware } from 'react-router-redux'
import utilsMiddleware from './utilsMiddleware';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import { routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
import reducers from './reducers';

// Build the middleware for intercepting and dispatching navigation actions
const loggerMiddleware = createLogger();

var middlewares = [
  thunkMiddleware,
  utilsMiddleware
];

if (process.env && process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
  // composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));
}
let composeEnhancers = applyMiddleware(...middlewares);
export default function configureStore(initialState) {
  // const historyMiddleware = routerMiddleware(history)
  // middlewares.push(historyMiddleware);
  return composeEnhancers(createStore)(reducers, initialState);
}
