import { combineReducers } from "redux";

import giphy from "./giphyReducer";

const appReducer = combineReducers({
  giphy,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
