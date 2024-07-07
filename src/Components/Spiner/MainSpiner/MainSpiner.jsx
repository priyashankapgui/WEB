import React from "react";
import BarLoader from "react-spinners/BarLoader";
import './MainSpiner.css';
import greenLeafLogo from '../../../Assets/favicon.png';

const MainSpiner = ({ loading }) => {
   
    return (
        <div className="sweet-loading" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh", }}>
            <div className="SpinnerSystem">
               <img src={greenLeafLogo} alt="Green Leaf Logo" className="spinerImage"/>
            </div>
            <BarLoader
                color="#36d06a"
                loading={loading}
                width={200} 
                height={10} 
                className="barLoader"
                css={{ margin: "auto" }} 
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default MainSpiner;
