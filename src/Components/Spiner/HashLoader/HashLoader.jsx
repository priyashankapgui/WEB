import React, { useState } from "react";
import './HashLoader.css'; // Import the CSS file
import HashLoader from "react-spinners/HashLoader";

const LoaderComponent = ({ size = 100 }) => {
    const [loading] = useState(true);

    return (
        <div className="sweet-loading">
            <HashLoader
                color="#36d06a"
                loading={loading}
                size={size} // Use the size prop
                css={{ margin: "auto" }} // Center loader horizontally
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default LoaderComponent;
