import React from 'react'
import './Layout.css'

import Topheader from '../Topheader/Topheader'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Searchbar from '../Searchbar/Searchbar'

export default function Layout({ children }) {
  return (
    <div className='layout'>
        <Topheader className='Topheader'/>
        <Navbar className='Navbar' />
        <Searchbar className='Searchbar'/>

        {children}

        <Footer className='Footer'/>
    </div>
  )
}
