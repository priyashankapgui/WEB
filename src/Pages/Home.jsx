import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Topheader from '../Components/Topheader/Topheader'
import Footer from '../Components/Footer/Footer'
import './Home.css'


export default function Home() {
  return (
    <div>

        <Topheader />
        <Navbar />
        
        <h1>Home Page</h1>
        <Footer/>
  
        
    </div>
  )
}
