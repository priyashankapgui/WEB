import React from 'react';
import './Snowflake.css';
import { FaCar } from "react-icons/fa";
import { FaSdCard } from "react-icons/fa";

const Snowflake = (props) => {
    return (
        <p className="Snowflake" id={`item${props.id}`} style={props.style}>
            <FaCar />
            <FaSdCard 
            color='red'/>

        </p>
    );
};

export default Snowflake;
