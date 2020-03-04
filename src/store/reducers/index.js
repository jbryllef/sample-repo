import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import login from "./login";
import articles from "./articles";

export default combineReducers({
  router: routerReducer,
  login,
  articles,
});
