import React, { useState, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import './Searchbar.css';

const url = "http://localhost:8080/categories";
const product_url = "http://localhost:8080/products";

const Searchbar = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.success && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        console.error('Fetched data is not as expected:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchData = async (value) => {
    try {
      const response = await axios.get(product_url);
      if (response.data.success && Array.isArray(response.data.data)) {
        const results = response.data.data.filter((product) => {
          const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
          const matchesSearchTerm = product.productName && product.productName.toLowerCase().includes(value.toLowerCase());
          return matchesCategory && matchesSearchTerm;
        });
        setResults(results);
      } else {
        console.error('Fetched products data is not as expected:', response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    fetchData(searchTerm);
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
        />
        <IoMdSearch className="search-icon" />
      </div>
    </div>
  );
};

export default Searchbar;
