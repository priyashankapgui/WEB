import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ReactComponent as MenuIcon } from '../../Assets/menu.svg'
import logo from '../../Assets/Green Leaf Super.png'
import { GoPerson } from "react-icons/go";
import './Navbar.css'
import { Link } from 'react-router-dom'
import CustomizedBadges from '../CartIcon/CartIcon'


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)
  
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }
  
    return (
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logo} alt='logo'></img>
          </div>
          <div className='navbar_p'>
            <p>Green Leaf</p>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <MenuIcon />
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
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
               
                 <GoPerson   className="iconPerson"/>
              
              </li>

              <Link to='/cart'>
              <li>
              <CustomizedBadges  className='nav_login_cart'/>
              </li>
              </Link>
             
            </ul>
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar