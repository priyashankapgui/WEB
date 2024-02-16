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
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>} />


    </Routes>

);

export default createRoutes;