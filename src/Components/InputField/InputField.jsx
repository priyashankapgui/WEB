import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 0.625em;
  border: 1px solid #8D9093;
  height: 2.25em;
  width: 27em;
  margin-top: 0.313em;
  margin-bottom: 0.313em;
  font-size: 0.75em;
  padding: 0.625em;
  opacity: ${(props) => (props.editable ? 1 : 0.5)};
  pointer-events: ${(props) => (props.editable ? 'auto' : 'none')};
`;

function InputField(props) {
    return (
        <div>
            <Input
                htmlFor={props.for}
                id={props.id}
                name={props.name}
                style={props.style}
                placeholder={props.placeholder}
                onChange={props.onChange}
                editable={props.editable}
            />
        </div>
    );
}

export default InputField;
