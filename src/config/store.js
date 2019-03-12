// External
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
// import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootState } from "./rootReducer";
// import rootSaga from "./rootSaga";
// eslint-disable-next-line
export let store;
export default function configureStore() {
  const enhancers = [];
  const history = createBrowserHistory();
  // const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // sagaMiddleware,
    reduxRouterMiddleware,
  ];
  middlewares.push(thunkMiddleware);

  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (process.env.NODE_ENV === "development" && typeof devToolsExtension === "function") {
    const logger = createLogger({
      collapsed: true,
    });
    middlewares.push(logger);
    enhancers.push(devToolsExtension());
  }

  const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);
  store = createStore(connectRouter(history)(rootReducer, rootState), composedEnhancers);
  // sagaMiddleware.run(rootSaga);
  return { store, history };
}
