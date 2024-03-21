import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  width: ${(props) => props.btnWidth || '5.125em'};
  height: ${(props) => props.btnHeight || '2em'};
  border-radius:${(props) => props.btnRadius || '0.5em'};
  font-weight: 200;
  font-size: 1em;
  border: none;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 0.625em;
  margin-bottom:3vh;
  padding: 0.125em;
  text-transform: none;
  text-align: center;
  &:hover { 
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.1),
      0 4px 7px -1px rgba(0, 0, 0, 0.06);
  }
`;

const Icon = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function Buttons(props) {
    return (
        <Button
            type={props.type}
            id={props.id}
            style={props.style}
            onClick={props.onClick}
            alignSelf={props.alignSelf}
            btnHeight={props.btnHeight}
            btnWidth={props.btnWidth}
            btnRadius={props.btnRadius}
        >
            {props.icon && <Icon src={props.icon} alt="Icon" />}
            {props.children}
        </Button>
    );
}

export default Buttons;
