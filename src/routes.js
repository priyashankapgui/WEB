import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';


const createRoutes=() => (
    <Routes>
        <Route Route exact path="/Home" element={<Home/>} />
        <Route path="/Products" element={<Products/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Cart" element={<Cart/>} />


    </Routes>

);

export default createRoutes;