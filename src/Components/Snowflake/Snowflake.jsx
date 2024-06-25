import React from 'react';
import './Snowflake.css';
import { FaCar } from "react-icons/fa";
import { FaSdCard } from "react-icons/fa";
import { BsSnow2 } from "react-icons/bs";

const Snowflake = (props) => {
    return (
        <p className="Snowflake" id={`item${props.id}`} style={props.style}>
            {/* <FaCar />
            <FaSdCard 
            color='red'/> */}
            <BsSnow2 />
        </p>
    );
};

export default Snowflake;
