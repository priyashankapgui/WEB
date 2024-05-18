import { NavLink } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { ReactComponent as MenuIcon } from '../../Assets/menu.svg'
import  carticon from '../../Assets/cart-shopping.svg'
import logo from '../../Assets/Green Leaf Super.png'
//import  profile from '../../Assets/profile-n.svg'
import './Navbar.css'
import { Link } from 'react-router-dom'
import UserProfileDetails from '../Popup/UserProfileDetails'


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)
    const [UserProfileDetailsOpen, setUserProfileDetailsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
      // Check if the JWT token is present in session storage
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
    
    const closeUserProfileDetails = () => setUserProfileDetailsOpen(false);

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
              {isLoggedIn ? (
              <li>
                <div className='nav_login_profile'>
                  <UserProfileDetails open={UserProfileDetailsOpen} onClose={closeUserProfileDetails} />
                </div>
                <NavLink to="/my-account">MyAccount</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">SignUp/Login</NavLink>
              </li>
            )}

             
              <Link to='/cart'>
              <li>
              <div className='nav_login_cart'>
               <div className='nav_cart_count'>0</div>
                <img src={carticon} alt='cart' />
              </div>
              </li>
              </Link>
             
            </ul>
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar