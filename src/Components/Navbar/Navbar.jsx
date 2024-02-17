import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ReactComponent as MenuIcon } from '../../Assets/menu.svg'
import  carticon from '../../Assets/cart-shopping.svg'
import logo from '../../Assets/Green Leaf Super.png'
import  profile from '../../Assets/profile-n.svg'
import './Navbar.css'
import { Link } from 'react-router-dom'


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
                <NavLink to="/signup">SignUp</NavLink>
              </li>

              <li>
               
              <div className='nav_login_profile'>
                 <img src={profile}  alt='profile'/>
              </div> 
              </li>

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