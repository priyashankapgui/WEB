import React from 'react';
import './Snowflake.css';
import { IoHeartSharp, IoSnowSharp } from "react-icons/io5";
import { LuSunDim } from "react-icons/lu";

const getSeason = () => {
    const month = new Date().getMonth() + 1; 

    if (month === 12 || month === 1 || month === 2) {
        return 'chrimstmas';
    } else if (month >= 2 && month <= 3) {
        return 'valentime';
    } else if (month >= 4 && month <= 5) {
        return 'newYear';
    } else if (month >= 6 && month <= 8) {
        return 'fall';
    }
};

const Snowflake = ({ id, style }) => {
    const season = getSeason();
    let icon;

    switch (season) {
        case 'chrimstmas':
            icon = <IoSnowSharp className='iconSnow' />;
            break;
        case 'valentime':
            icon = <IoHeartSharp className='iconHeart' />;
            break;
        case 'newYear':
            icon = <LuSunDim className='iconSunny' />;
            break;
        case 'fall':
            icon = <IoSnowSharp className='iconSnow' />;
          
            break;
        default:
          
            break;
    }

    return (
        <p className="Snowflake" id={`item${id}`} style={style}>
            {icon}
        </p>
    );
};

export default Snowflake;
