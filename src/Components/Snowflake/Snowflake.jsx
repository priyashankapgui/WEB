import React from 'react';
import './Snowflake.css';
import { BsSnow2 } from "react-icons/bs";

const Snowflake = (props) => {
    return (
        <p className="Snowflake" id={`item${props.id}`} style={props.style}>
            {/* <BsSnow2 /> */}
            <img className='heartImg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/640px-Heart_coraz%C3%B3n.svg.png" alt="" />
        </p>
    );
};

export default Snowflake;
