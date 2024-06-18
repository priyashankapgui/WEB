import React, { useState } from 'react';
import './SearchResultsList.css';
import SearchResult from './SearchResult'; // Import default export

export const SearchResultsList = ({ results }) => {
  const [showResults, setShowResults] = useState(true); // State to manage visibility

  const handleProductClick = () => {
    setShowResults(false); // Hide results-list when a product is clicked
  };

  return (
    <div className='results-list' style={{ display: showResults ? 'block' : 'none' }}>
      {results.map((result, id) => (
        <SearchResult result={result} key={id} onClick={handleProductClick} />
      ))}
    </div>
  );
};
