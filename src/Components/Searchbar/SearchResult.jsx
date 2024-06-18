// SearchResult.js

import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResult.css';

const SearchResult = ({ result }) => {
  return (
    <Link to={`/single-product/${result.productId}`} className='search-result-link'>
      <div className='search-result'>{result.productName}</div>
    </Link>
  );
};

export default SearchResult;
