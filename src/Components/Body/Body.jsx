import React from "react";
import "./Body.css";

const Body = (props) => {
  return <div className="body-content">{props.children}</div>;
};

export default Body;
