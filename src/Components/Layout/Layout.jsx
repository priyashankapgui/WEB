import React from 'react'
import './Layout.css'


import Topheader from '../Topheader/Topheader'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout({ children }) {
  return (
    <div>
        <Topheader/>
        <Navbar/>

        {children}

        <Footer/>
    </div>
  )
}
