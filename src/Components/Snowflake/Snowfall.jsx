import React, { useEffect, useState } from 'react';
import Snowflake from './Snowflake';
import './Snowflake.css';

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const generateSnowflakes = () => {
            let flakes = [];
            for (let i = 0; i < 20; i++) {
                const style = {
                    left: Math.random() * 100 + 'vw',
                    animationDelay: Math.random() * 20 + 's',
                    fontSize: Math.random() * 20 + 10 + 'px',
                };
                flakes.push(<Snowflake key={i} id={i} style={style} />);
            }
            setSnowflakes(flakes);
        };

        generateSnowflakes();
    }, []);

    return (
        <div className="Snowfall">
            {snowflakes}
        </div>
    );
};

export default Snowfall;
