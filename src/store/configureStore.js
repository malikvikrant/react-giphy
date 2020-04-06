import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import giphyFetchEpic from "../epic/giphyEpic";
import rootReducer from "../reducer/appReducer";

/**
 * @return {Function} middleware.
 * */
export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const middleWares = [thunkMiddleware, epicMiddleware];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let createStoreWithMiddleware = null;

  // apply logger conditionally to log in dev env only.
  if (process.env.NODE_ENV !== "production") {
    middleWares.push(createLogger());

    createStoreWithMiddleware = composeEnhancers(
      applyMiddleware(...middleWares)
    )(createStore);
  } else {
    createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore);
  }
  const store = createStoreWithMiddleware(rootReducer);

  epicMiddleware.run(giphyFetchEpic);

  return store;
}
