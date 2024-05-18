import React, { useState} from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import greenmart from "../../Assets/Green Leaf Super.png";
import InputField from "../../Components/InputField/InputField";
import { FaRegEye, FaRegUserCircle,FaEyeSlash} from "react-icons/fa";
import Buttons from "../../Components/Button/Button";



export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

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
    const cus = JSON.stringify({
      email : email,
      password : password,
    })

    const response = await fetch ('http://localhost:8080/api/customers/login',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : cus,
    }).catch((error) => console.error("Error:", error));

    if (response.ok){
      const data = await response.json();
      console.log("Response data:", data);

      // Store the token in local storage
      sessionStorage.setItem("accessToken", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = '/';
    }
    else {
      //login failed
      const data = await response.json();
      console.log("Error:", data.message);
      setError(data.message);
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
                type="password"
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

              {error && <p className="login-error">{error}</p>}
              
            </div>
            <div className="s-w-forgotpw">
              <Link to="/login/forgotpw">Forgot Password?</Link>
            </div>
            <div className="s-w-Lsignup">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <Buttons
              className="s-w-loginButton"
              type="submit"
              id="submit"
              style={{ backgroundColor: "green", color: "white"}}
              $alignSelf="center"
            >
              Login
            </Buttons>
          </form>

          
        </div>
      </div>
    </div>
  );
}
