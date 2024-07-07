import React, { useState, useEffect, useRef } from 'react';
import './SearchResultsList.css';
import SearchResult from './SearchResult'; 

export const SearchResultsList = ({ results }) => {
  const [showResults, setShowResults] = useState(true); 
  const resultsListRef = useRef(null); 
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowResults(false); 
  //   }, 5000);

  //   return () => clearTimeout(timer); 
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsListRef.current && !resultsListRef.current.contains(event.target)) {
        setShowResults(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, [resultsListRef]);

  const handleProductClick = () => {
    setShowResults(false); 
  };

  return (
    <div ref={resultsListRef} className='results-list' style={{ display: showResults ? 'block' : 'none' }}>
      {results.map((result, id) => (
        <SearchResult result={result} key={id} onClick={handleProductClick} />
      ))}
    </div>
  );
};
