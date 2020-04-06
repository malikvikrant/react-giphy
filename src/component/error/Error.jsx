import React from "react";
import { GIPHY_ERROR_MESSAGE } from "../../utils/constants";
import "./error.css";

const Error = () => {
  return (
    <div className="error-container">
      <label className="error-label">{GIPHY_ERROR_MESSAGE}</label>
    </div>
  );
};

export default Error;
