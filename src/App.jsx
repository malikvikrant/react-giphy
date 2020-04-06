import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import Giphy from "./component/giphy/Giphy.jsx";
import "./app.css";

export default class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Giphy />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
