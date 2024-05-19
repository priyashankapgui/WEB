import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: ${(props) => props.fontSize || "0.875em"};
  font-family: ${(props) => props.fontFamily || "Poppins"};
  font-weight: ${(props) => props.fontWeight || 500};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight || "normal"};
  margin-top: ${(props) => props.marginTop || 0};
  margin-bottom: ${(props) => props.marginBottom || 0};
  padding-top: ${(props) => props.paddingTop || 0};
`;

function InputLabel(props) {
  const {
    htmlFor,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    marginTop,
    marginBottom,
    paddingTop,
    children,
  } = props;
  return (
    <div>
      <StyledLabel
        htmlFor={htmlFor}
        color={color}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        marginTop={marginTop}
        marginBottom={marginBottom}
        paddingTop={paddingTop}
      >
        {children}
      </StyledLabel>
    </div>
  );
}

export default InputLabel;
