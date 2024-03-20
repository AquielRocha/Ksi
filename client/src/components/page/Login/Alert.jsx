import React from "react";
import "./Alert.css";

const Alert = ({ message }) => {
  return (
    <div className="alert-container">
      <div className="alert-message">{message}</div>
    </div>
  );
};

export default Alert;
