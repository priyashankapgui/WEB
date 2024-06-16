import React, { useState, useEffect } from 'react';
import { RiSearchLine } from "react-icons/ri";
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
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error('Fetched data is not as expected:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchData = (value) => {
    fetch(product_url)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const results = json.data.filter((product) => {
            const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
            const matchesSearchTerm = product.productName && product.productName.toLowerCase().includes(value.toLowerCase());
            return matchesCategory && matchesSearchTerm;
          });
          setResults(results);
        } else {
          console.error('Fetched products data is not as expected:', json);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
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
      <div className='drop'>
        <select className="dropdown" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">Categories</option>
          {categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
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