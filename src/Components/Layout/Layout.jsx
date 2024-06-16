import React, { useState } from "react";
import "./Layout.css";
import Topheader from "../Topheader/Topheader";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Searchbar from "../Searchbar/Searchbar";
import Body from "../Body/Body";
import { SearchResultsList } from "../Searchbar/SearchResultsList";


export default function Layout({ children }) {
  const [results, setResults] = useState([]);

  return (
    <div className="layout">
      <div id="wrapper">
   
      
        <div id="topcontent">
          <Topheader />
        </div>
        <div id="navcontent">
          <Navbar />
          <Searchbar setResults={setResults} />
          {results.length > 0 && <SearchResultsList results={results} />}
        </div>
        {children}
        <div id="footercontent">
          <Footer />
        </div>
      </div>
    </div>
  );
}