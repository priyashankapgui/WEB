import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPw.css";
import InputField from "../../../Components/InputField/InputField";
import Buttons from "../../../Components/Button/Button";
import Popup from "../../../Components/Popup/Popup";
import LoaderComponent from "../../../Components/Spiner/HashLoader/HashLoader";
import PasswordStrengthBar from "react-password-strength-bar";


const ResetPw = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      setLoading(false);
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    // If token is not present, redirect to login page
    if (!token) {
      setLoading(false);
      window.location.href = "/login";
    } else {
      const response = await fetch("http://localhost:8080/api/customers/login/forgotpw/resetpw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword: password,
          confirmPassword: confirmPassword,
        }),
      }).catch((error) => console.error("Error:", error));

      if (response.ok) {
        setLoading(true);
        const data = await response.json();
        setShowPopup(true);
        console.log("Response data:", data);
      } else {
        setLoading(false);
        const data = await response.json();
        setError(data.message);
      }
    }

    
  };

  const handleOkButtonClick = () => {
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
            value={password}
            required
          >
            <button
              type="button"
              onClick={toggleShowPassword}
              className="toggle-password-button"
              style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </InputField>
          {password && (
              <PasswordStrengthBar
                password={password}
                minLength={8}
                scoreWordStyle={{
                  fontSize: "14px",
                  fontFamily: "Poppins",
                }}
                scoreWords={[
                  "very weak",
                  "weak",
                  "good",
                  "strong",
                  "very strong",
                ]}
                shortScoreWord="should be atlest 8 characters long"
              />
          )}
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
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </InputField>
           {loading ? (
                <div className='loading-container'>
                    <LoaderComponent size={50} />
                </div>
            ) : (
              <Buttons
                type="submit"
                id="save-btn"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Save
              </Buttons>
          )}
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
