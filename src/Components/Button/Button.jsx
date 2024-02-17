import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 5.125em;
  height: 2em;
  border-radius: 0.625em;
  font-weight: 200;
  font-size: 1em;
  border: none;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 0.625em;
  padding: 0.125em;
  text-transform: none;
  text-align: center;
  
`;

function Buttons(props) {
    return (
        <div>
            <Button type={props.type} id={props.id} style={props.style} onClick={props.onClick} alignSelf={props.alignSelf}>{props.children}</Button>
        </div>
    );
}

export default Buttons;
