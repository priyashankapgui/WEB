import React from 'react'
import insta from '../../Assets/instagram.svg'
import youtube from '../../Assets/youtube-new.svg'
import logo from '../../Assets/Green Leaf Super.png'
import { ReactComponent as fbicon } from '../../Assets/facebook-new.svg'
import './Footer.css'


const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer_section_padding'>
            <div className='footer-links'>

            <div className='footer-links-div'>
                <div className='logo'><img src={logo} alt='logo'></img>
               
                </div>
                <h2>Green Lreaf</h2>
                </div>   
                

            <div className='footer-links-div'>
                    <h4>Contact Us</h4>
                    <a href='/feedback'>
                        <p>091-365 4576</p>
                    </a>
                    <a href='/feedback'>
                        <p>No:83/05 1 Galle Face, <br /> Colombo 2, Sri Lanka</p>
                    </a>
                    <a href='/feedback'>
                        <p>greenleaf@gmail.com</p>
                    </a>
                </div>

            <div className='footer-links-div'>
                    <h4>Contact Us</h4>
                    <a href='/feedback'>
                        <p>091-365 4576</p>
                    </a>
                    <a href='/feedback'>
                        <p>No:83/05 1 Galle Face, <br /> Colombo 2, Sri Lanka</p>
                    </a>
                    <a href='/feedback'>
                        <p>greenleaf@gamil.com</p>
                    </a>
                </div>

            <div className='footer-links-div'>
                    <h4>Account</h4>
                    <a href='/signIn'>
                        <p>My Account</p>
                    </a>
                    <a href='/signup'>
                        <p>Register</p>
                    </a>
                   
            </div>

            <div className='footer-links-div'>
                    <h4>Follow Us</h4>
                <div className='socialmedia'>
                    <fbicon />

                </div>
            </div>


            </div>
        </div>
    </footer>
  )
}

export default Footer
