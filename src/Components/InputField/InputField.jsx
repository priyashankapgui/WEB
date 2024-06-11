import React from "react";
// import styled from "styled-components";

// const inputStyle = {
//     borderRadius: '0.625em',
//     border: '1px solid #8d9093',
//     height: '2.25em',
//     width: '27em',
//     marginTop: '0.313em',
//     marginBottom: '0.313em',
//     fontSize: '0.75em',
//     fontFamily: 'Poppins, sans-serif',
//     padding: '0.625em',
//     textAlign: 'left',
//     backgroundColor: '#eaeaea',
//     opacity: {props.editable} ? 1 : 0.5,
// };

function InputField(props) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <input
        htmlFor={props.for}
        id={props.id}
        name={props.name}
        style={{
          borderRadius: "0.625em",
          border: "1px solid #8d9093",
          height: "2.25em",
          width: "27em",
          marginTop: "0.313em",
          marginBottom: "0.313em",
          fontSize: "0.75em",
          fontFamily: "Poppins, sans-serif",
          padding: "0.625em",
          textAlign: "left",
          backgroundColor: "#eaeaea",
          opacity: props.editable ? 1 : 0.5,
        }}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value} 
        onChange={props.onChange}
        editable={props.editable}
      />
      {props.children && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            right: "0.625em",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.children}
        </span>
      )}
    </div>
  );
}

export default InputField;
