import React from "react";
import "./Body.css";
import Snowfall from "../Snowflake/Snowfall";

const Body = (props) => {
  return <div className="body-content">{props.children}
  <Snowfall/></div>;
};

export default Body;
