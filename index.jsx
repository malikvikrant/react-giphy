import ReactDOM from "react-dom";
import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import App from "./src/App.jsx";
import configureStore from "./src/store/configureStore";

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById("container"));
