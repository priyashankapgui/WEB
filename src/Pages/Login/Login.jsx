import React, { useState} from "react";
import { Link } from "react-router-dom";
import greenmart from "../../Assets/Green Leaf Super.png";
import "./Login.css";
import InputField from "../../Components/InputField/InputField";
import { FaRegEye, FaRegUserCircle} from "react-icons/fa";
import Buttons from "../../Components/Button/Button";



export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 

  // useEffect(() => {
  //   // Retrieve employee ID and password from sessionStorage
  //   const storedUsername = sessionStorage.getItem("username");
  //   const storedPassword = sessionStorage.getItem("password");
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  //   if (storedPassword) {
  //     setPassword(storedPassword);
  //   }
  // }, []);

  const handleLogin = async(e) => {
    e.preventDefault();
    
  
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
                id="username"
                name="username"
                type="text"
                placeholder="UserName"
                onChange={handleUsernameChange}
                editable={true}
                required>
              <FaRegUserCircle className="w-lg-icon"></FaRegUserCircle>
              </InputField>

            </div>
            <div>
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                editable={true}
                required>
              <FaRegEye className="w-lg-icon"></FaRegEye>
              </InputField>
              
            </div>
            <div className="s-w-forgotpw">
              <Link to="/login/forgotpw">Forgot Password?</Link>
            </div>
            <div className="s-w-Lsignup">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <Buttons
              type="submit"
              id="submit"
              style={{ backgroundColor: "green", color: "white"}}
              alignSelf="center"
            >
              Login
            </Buttons>
          </form>

          
        </div>
      </div>
    </div>
  );
}
