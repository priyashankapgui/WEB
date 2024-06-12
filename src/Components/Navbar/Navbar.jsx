import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "../../Assets/menu.svg";
import logo from "../../Assets/Green Leaf Super.png";
import { GoPerson } from "react-icons/go";
import "./Navbar.css";
import { Link } from "react-router-dom";
import CustomizedBadges from "../CartIcon/CartIcon";
import axios from "axios";
import InputDropdown from "../Dropdawon/Dropdawon";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [branches, setBranchData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const branchesApiUrl = "http://localhost:8080/branchesWeb";

  useEffect(() => {
    const fetchBranchData = async () => {
        try {
            const token = sessionStorage.getItem("accessToken");
            const response = await axios.get(branchesApiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setBranchData(Array.isArray(response.data) ? response.data : response.data.branchesList || []);
          
        } catch (error) {
            console.error('Error fetching branches:', error);
            
        }
    };

    fetchBranchData();

    }
);


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
