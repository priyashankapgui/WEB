import React, { useState} from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import greenmart from "../../Assets/Green Leaf Super.png";
import InputField from "../../Components/InputField/InputField";
import { FaRegEye, FaRegUserCircle,FaEyeSlash} from "react-icons/fa";
import Buttons from "../../Components/Button/Button";
import LoaderComponent from "../../Components/Spiner/HashLoader/HashLoader";
import secureLocalStorage from "react-secure-storage";
import { loginCustomer } from "../../Api/LoginApi/LoginApi";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async(e) => {
    try{
        e.preventDefault();
        setLoading(true);
        const response = await loginCustomer(email, password);
        console.log(response);
        if (response.status === 200){
          const data = await response.data;
          console.log("Success:", data);
          secureLocalStorage.setItem("accessToken", data.token);
          secureLocalStorage.setItem("user", data.user);
          window.location.href = '/';
        }
        else {
          //login failed
          const data = await response.data;
          console.log("Error:", data.message);
          setError(data.message);
          setLoading(false);
        }
      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    
  
  };



  return (
    <div className="s-w-loginContainer">
      <div className="s-w-loginCard">
        <div className="s-w-leftcontainer">
          <img
            className="sw-greenmart-image"
            src={greenmart}
            alt="greenmart logo"
          />
        </div>
        <div className="s-w-rightcontainer">
          <form className="s-w-form" onSubmit={handleLogin}>
            <div>
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                editable={true}
                required>
              <FaRegUserCircle/>
              </InputField>

            </div>
            <div>
              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
              {error && <p className="login-error">{error}</p>}
            <div className="s-w-forgotpw">
              <Link to="/login/forgotpw">Forgot Password?</Link>
            </div>
            <div className="s-w-Lsignup">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            {loading ? (
                <div className='loading-container'>
                    <LoaderComponent size={50} />
                </div>
            ) : (
                <Buttons
                  className="s-w-loginButton"
                  type="submit"
                  id="submit"
                  style={{ backgroundColor: "green", color: "white"}}
                  $alignSelf="center"
                >
                  Login
                </Buttons>
            )}
          </form>
          <div className="s-w-terms">
            <p>
            &copy; 2022 Green Leaf Company. All rights reserved.
            </p> 
          </div>

        </div>
      </div>
    </div>
  );
}