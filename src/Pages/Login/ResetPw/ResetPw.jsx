import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPw.css";
import InputField from "../../../Components/InputField/InputField";
import Buttons from "../../../Components/Button/Button";
import Popup from "../../../Components/Popup/Popup";

const ResetPw = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

   

    // If token is not present, redirect to login page
    if (!token) {
      window.location.href = "/login";
    } else {
      const response = await fetch("http://localhost:8080/api/customers/login/forgotpw/resetpw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword: password,
          confirmPassword: confirmPassword,
        }),
      }).catch((error) => console.error("Error:", error));

      if (response.ok) {
        const data = await response.json();
        setShowPopup(true);
        
        console.log("Response data:", data);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    }

    
  };

  const handleOkButtonClick = () => {

    // Navigate back to login page
    window.location.href = "/login";
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClose=()=> {
    setShowPopup(false);
    window.location.href="/login";

  }

  return (
    <div className="s-rp-container">
      <form className="s-rp-form" onSubmit={handleResetPassword}>
        <div className="s-resetText">
          <h2>Reset Password</h2>
        </div>
        <div className="s-rp-inputField">
          <p>New Password:</p>
          <InputField
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="New password"
            editable={true}
            onChange={handlePasswordChange}
            required
          >
     
            <button
              type="button"
              onClick={toggleShowPassword}
              className="toggle-password-button"
              style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </InputField>
          <p>Confirm New Password:</p>
          <InputField
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            editable={true}
            onChange={handleConfirmPasswordChange}
            required
          >
      
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="toggle-password-button"
              style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </InputField>

          <Buttons
            type="submit"
            id="save-btn"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Save
          </Buttons>
        </div>
        {error && <p className="rp-error">{error}</p>}
      </form>

      {showPopup && (
        <Popup
          open={showPopup}
          onClose={handleClose}
          headBG="green"
          title="Alert"
          headTextColor="White"
          closeIconColor="white"
          bodyContent={(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p>Your password has been reset successfully.</p>
              <Link to="/">
                <Buttons
                  type="button"
                  id="ok-btn"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={handleOkButtonClick}
                >
                  Ok
                </Buttons>
              </Link>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ResetPw;
