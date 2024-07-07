import React, { useState } from "react";
import greenmart from "../../Assets/Green Leaf Super.png";
import "./Signup.css";
import InputField from "../../Components/InputField/InputField";
import Buttons from "../../Components/Button/Buttons";
import { FaRegEye,FaEyeSlash} from "react-icons/fa";
import LoaderComponent from '../../Components/Spiner/HashLoader/HashLoader';
import CustomAlert from "../../Components/Alerts/CustomAlert/CustomAlert";
import PasswordStrengthBar from "react-password-strength-bar";
import { registerCustomer } from "../../Api/LoginApi/LoginApi";



const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);



  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
    setError("");
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
    setError("");
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setError("");
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    // Frontend validation
    if (!firstname || !lastname || !email || !phone || !address || !password || !confirmpassword) {
      setLoading(false);
      setError("All fields are required");
      return;
    }
    if (password !== confirmpassword) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     throw new Error("Invalid email format");
    // }
    const customerData = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
      address: address,
      password: password,
    }
    const response = await registerCustomer(customerData);
  if (response.status === 201){
    setLoading(false);
    setShowAlertSuccess('Account created successfully');
    window.location.href = '/login';
  }else {
    setLoading(false);
    const data = await response.data;
    console.log("Error:", data.message);
    setError(data.message);
  }

  };
  return (
      <div className="signup-Container">
        <div className="signupCard">
          <div className="signup-leftcontainer">
            <img
              className="sw-greenmart-image"
              src={greenmart}
              alt="greenmart logo"
            />
          </div>
          <div className="signup-rightcontainer">
            <form className="signup-form" onSubmit={handleSignup}>
              <div>
                <InputField
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="FirstName"
                  value={firstname}
                  onChange={handleFirstnameChange}
                  editable={true}
                  required>
                
                </InputField>
  
              </div>

              <div>
                <InputField
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="LastName"
                  value={lastname}
                  onChange={handleLastnameChange}
                  editable={true}
                  required>
                </InputField>
              </div>

              
              <div>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  editable={true}
                  required>
                
                </InputField>
              </div>

              <div>
                <InputField
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  editable={true}
                  required>
                
                </InputField>
              </div>
              <div>
                <InputField
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={handleAddressChange}
                  editable={true}
                  required>
                </InputField>
              </div>

              <div>
                <InputField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  editable={true}
                  required>

                {showPassword ? (
                    <FaRegEye
                      onClick={toggleShowPassword}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={toggleShowPassword}
                      style={{ cursor: "pointer" }}
                    />
                  )}
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
              </div>
              <div>
                <InputField
                  id="confirmpassword"
                  name="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={handleConfirmPasswordChange}
                  editable={true}
                  required>

                  {showConfirmPassword ? (
                    <FaRegEye
                      onClick={toggleShowConfirmPassword}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={toggleShowConfirmPassword}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputField>
                {error && <p className="signup-error">{error}</p>}
              </div>
              <div>
              {loading ? (
                  <div className='loading-container'>
                      <LoaderComponent size={50} />
                  </div>
              ) : (
                  <Buttons
                    type="submit"
                    id="submit"
                    style={{ backgroundColor: "green", color: "white"}}
                    btnWidth="fit-content"
                    alignSelf="center"
                  >
                    Create Account
                  </Buttons>
              )}
              </div>
              <div>
                <p className="signup-para">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </form>
            {showAlertSuccess && (
                <CustomAlert
                    severity="success"
                    title="Success"
                    message={showAlertSuccess}
                    duration={4000}
                    onClose={() =>window.location.href = '/login'}
                />
                )}
          </div>
        </div>
      </div>
  );
};

export default Signup;