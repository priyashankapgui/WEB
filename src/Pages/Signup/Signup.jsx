import React, { useState } from "react";
import greenmart from "../../Assets/Green Leaf Super.png";
import "./Signup.css";
import InputField from "../../Components/InputField/InputField";
import Buttons from "../../Components/Button/Button";
import { FaRegEye,FaEyeSlash} from "react-icons/fa";


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

  const handleSignup = async (e) => {
    e.preventDefault();



    // Frontend validation
    if (!firstname || !lastname || !email || !phone || !address || !password || !confirmpassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     throw new Error("Invalid email format");
    // }
    
    const cus = JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
      address: address,
      password: password,
    })

    
    const response = await fetch ('http://localhost:8080/api/customers/registercustomer',{
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : cus,
  }).catch((error) => console.error("Error:", error));

  if (response.ok){
    alert('Account created successfully');
    window.location.href = '/login';
  }else {
    const data = await response.json();
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
                  placeholder="firstName"
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
                  placeholder="lastName"
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
                  type="password"
                  placeholder="Password"
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
                
              </div>
              <div>
                <InputField
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={handleConfirmPasswordChange}
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

                {error && <p className="signup-error">{error}</p>}

              </div>

              <Buttons
                type="submit"
                id="submit"
                style={{ backgroundColor: "green", color: "white"}}
                alignSelf="center"
              >
                Create Account
              </Buttons>
            </form>
  
            
          </div>
        </div>
      </div>
  );
};

export default Signup;