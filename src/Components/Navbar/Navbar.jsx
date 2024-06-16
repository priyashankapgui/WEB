import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "../../Assets/menu.svg";
import logo from "../../Assets/Green Leaf Super.png";
import { GoPerson } from "react-icons/go";
import "./Navbar.css";
import { Link } from "react-router-dom";
import CustomizedBadges from "../CartIcon/CartIcon";
import InputDropdown from "../Dropdawon/Dropdawon";
import secureLocalStorage from "react-secure-storage";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [branches, setBranches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = secureLocalStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    fetch("http://localhost:8080/branchesWeb")
      .then((response) => response.json())
      .then((data) => setBranches(data));
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="Logo_content">
          <div className="logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="navbar_p">
            <p>Green Leaf</p>
          </div>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <MenuIcon />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <div>
            <ul className="nav_item1">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <InputDropdown
                  id="branchDropdown"
                  name="branchDropdown"
                  options={branches.map((branch) => branch.branchName)}
                  editable={true}
                  onChange={(e) => console.log("Selected option:", e.target.value)}
                />
              </li>
            </ul>
          </div>

          <div>
            <ul className="navbar_cart_person">
            {isLoggedIn ? (
              <li>
                <NavLink to="/my-account">
                  <GoPerson className="iconPerson" />
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
                
              </li>
            )}

              <li>
                <Link to="/cart">
                  <CustomizedBadges className="nav_login_cart" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
