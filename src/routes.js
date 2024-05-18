import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import About from "./Pages/About/About";
import Signup from "./Pages/Signup/Signup";
import Contact from "./Pages/Contact/Contact";
import Cart from "./Pages/Cart/Cart";

const createRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/about" element={<About />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
);

export default createRoutes;
