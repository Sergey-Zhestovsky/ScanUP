import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./storage/reducers/rootReducer";
//import rootConnector from "./storage/connection/rootConnector";

import "./index.less";
import "normalize.css";

let store = createStore(
  rootReducer,
  //applyMiddleware(thunk.withExtraArgument(rootConnector))
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();