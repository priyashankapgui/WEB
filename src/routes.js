import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products_Main/Products';
import ProductsAll from './Pages/Products/ProductsAll/ProductsAll';
import About from './Pages/About/About';
import Signup from './Pages/Signup/Signup';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import Success from "./Pages/Cart/Success";
import Cancel from "./Pages/Cart/Cancel";
import Login from './Pages/Login/Login';
import ForgotPw from './Pages/Login/ForgotPw/ForgotPw';
import ResetPw from './Pages/Login/ResetPw/ResetPw';
import MyAccount from './Pages/MyAccount/MyAccount';
import Bill from './Pages/Ebill/Ebill'


const createRoutes=() => (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
        <Route path="/my-account" element={<MyAccount/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/login/forgotpw" element={<ForgotPw/>} />
        <Route path="/login/forgotpw/resetpw" element={<ResetPw/>}/>
        <Route path="/bill" element={<Bill/>}/>
        <Route path="/productsall" element={<ProductsAll/>} />


    </Routes>

);

export default createRoutes;