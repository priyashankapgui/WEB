import React, { useState, useEffect } from 'react';
import { RiSearchLine } from "react-icons/ri";
import './Searchbar.css'; 
const url = "http://localhost:8080/categories";
const product_url = "http://localhost:8080/products";

const Searchbar = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array ensures useEffect runs only once

  const fetchCategories = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchData = (value) => {
    fetch(product_url)
    .then((res) => res.json())
    .then((json) => {
      const results = json.filter((product) => {
        return (
          value && 
          product && 
          product.productName && 
          product.productName.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results);
    });
  }

  const handleChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  }

  return (
    <div className="search-container">
      <div className='drop'>
        <select className="dropdown" value={''} onChange={''}>
          <option value="all">Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
      
      <button className="search-button">
        <RiSearchLine style={{ fontSize: '31px' }} />
      </button>

      <div className="horizontal-line"></div>
    </div>
  );
};

export default Searchbar;
