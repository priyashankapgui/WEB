import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "./ForgotPw.css";
import InputField from "../../../Components/InputField/InputField";
import Buttons from "../../../Components/Button/Button";
import Popup from "../../../Components/Popup/Popup";
import LoaderComponent from "../../../Components/Spiner/HashLoader/HashLoader";


const ForgotPw = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setshowPopup] = useState(false); // State to control the visibility of SubPopup
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear any previous error message when user starts typing
    setError("");
  };

  const handleOpen = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    // Validate if the email ends with "@gmail.com"
    if (
        !email.endsWith("@gmail.com") ||
        !email.includes("@") ||
        !email.includes(".") ||
        !email.includes("com")
    ) {
        setError("Please enter a valid email address.");
        return;
    }
    
    const response = await fetch("http://localhost:8080/api/customers/login/forgotpw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email 
      }),
    }).catch((error) => console.error("Error:", error));
    
    if (response.ok) {
      setLoading(false);  
      setshowPopup(true);
    } else {
      setLoading(false);
      const data = await response.json();
      setError(data.message);
    }
  };
  const handleClose = () => {
    setshowPopup(false);
    //window.location.href = "/login/resetpw";
  };

  const handleOkButtonClick = () => {
    setshowPopup(false);
  };
  return (
    <div className="s-fp-container">
      <form className="s-fp-form">
        <div className="s-forgotText">
          <h2>Forgot Password</h2>
        </div>

        <p>Enter your email to reset your password:</p>

        <div className="s-fp-inputField">
          <InputField 
          type="email" 
          id="emailF"
          name="emailF" 
          placeholder="example@gmail.com" 
          editable={true} 
          onChange={handleEmailChange} 
          required>
            <FaEnvelope className="s-fp-icon" />
          </InputField>
          {loading ? (
                <div className='loading-container'>
                    <LoaderComponent size={50} />
                </div>
            ) : (
             <Buttons type="submit" id="confirm-btn" style={{ backgroundColor: "green", color: "white" }} onClick={handleOpen}> Confirm </Buttons>
          )}
        </div>

        {error && <p className="fp-error">{error}</p>}

        <p className="backtologin">
          Remember your password?
          <Link to="/login">  Login</Link>
        </p>
      </form>

      {console.log("Popup:", Popup)}

      {showPopup &&(
        <Popup
          open={showPopup}
          onClose={handleClose}
          popupPosition="center"
          headBG="green"
          title="Alert"
          headTextColor="White"
          closeIconColor="white"
          
          bodyContent={(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p>Your password has been sent to your email</p>
                {loading ? (
                  <div className='loading-container'>
                      <LoaderComponent size={50} />
                  </div>
                ) : (
                  <Buttons type="button" id="ok-btn" style={{ backgroundColor: "green", color: "white" }} onClick={handleOkButtonClick}>Ok </Buttons>
                )}
            </div>
          )}
        />
        )}
      
    </div>
  );
};

export default ForgotPw;
