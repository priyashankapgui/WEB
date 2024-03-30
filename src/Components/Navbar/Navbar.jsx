import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as MenuIcon } from "../../Assets/menu.svg";
import logo from "../../Assets/Green Leaf Super.png";
import { GoPerson } from "react-icons/go";
import "./Navbar.css";
import { Link } from "react-router-dom";
import CustomizedBadges from "../CartIcon/CartIcon";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

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
          </ul>

          </div>
        
        <div>
          <ul className="navbar_cart_person">
              <li>
                <GoPerson className="iconPerson" />
              </li>

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
