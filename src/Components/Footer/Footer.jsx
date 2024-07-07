import React from "react";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import logo from "../../Assets/Green Leaf Super.png";
import "./Footer.css";

const Footer = () => {
  const token = secureLocalStorage.getItem("accessToken");

  return (
    <footer className="footer">
      <div className="footer_section_padding">
        <div className="footer-links">
          <div className="logoName">
            <div>
              <img src={logo} alt="logo" className="logoImg"></img>
            </div>
            <div>
              <h2>Green Leaf</h2>
            </div>
          </div>

          <Link to="/Contact">
            <div className="footer-links-div">
              <h4>Contact Us</h4>

              <p>091-365 4576</p>
              <p>
                No:83/05 1 Galle Face, <br /> Colombo 2, Sri Lanka
              </p>
              <p>greenleaf@gmail.com</p>
            </div>{" "}
          </Link>

          <div className="footer-links-div">
            <h4>Account</h4>
            {token ? (
              <Link to="/my-account">
                <p>My Account</p>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <p>Login</p>
                </Link>
                <Link to="/signup">
                  <p>Register</p>
                </Link>
              </>
            )}
          </div>

          <div className="footer-links-div">
            <h4>Follow Us</h4>
            <div className="socialmedia">
              <div>
                <a href="https://www.facebook.com/">
                  <SiFacebook size="24px" />
                </a>
              </div>

              <div>
                <a href="https://www.youtube.com/">
                  <FaYoutube size="24px" />
                </a>
              </div>

              <div>
                <a href="https://www.instagram.com/">
                  <RiInstagramFill size="24px" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
