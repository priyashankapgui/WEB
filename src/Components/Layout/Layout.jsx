import React from 'react'
import './Layout.css'


import Topheader from '../Topheader/Topheader'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Searchbar from '../Searchbar/Searchbar'
import Body from '../Body/Body'

export default function Layout({ children }) {
  return (
    <div className='layout'>

        <div id="wrapper">

          <div id="topcontent">
          <Topheader/>
          </div>

          <div id="navcontent">
          <Navbar/>
          <Searchbar/>
          </div>

          {children}

          <div id="bodycontent">
         <Body/>
          </div>

         <div id="footercontent">
          <Footer/>
          </div>

      </div>
    </div>
  )
}
