import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 5.125em;
  height: 2em;
  border-radius: 0.625em;
  font-weight: 200;
  font-size: 1em;
  border: none;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 0.625em;
  // padding: 0.125em;
  text-transform: none;
  text-align: center;
  font-family: "Poppins", sans-serif;
  cursor: pointer; /* Changes the mouse pointer to a hand icon */
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    background-color: #f0f0f0; /* Example hover effect */
     box-shadow: 0 0 5px 2px #51B541; /* Green glow effect */
  }
`;

function Buttons(props) {
  return (
    <div>
      <Button
        type={props.type}
        id={props.id}
        style={props.style}
        onClick={props.onClick}
        alignSelf={props.$alignSelf}
      >
        {props.children}
      </Button>
    </div>
  );
}

export default Buttons;
