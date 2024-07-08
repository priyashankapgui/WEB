import React, { useState } from "react";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Searchbar from "../Searchbar/Searchbar";
import { SearchResultsList } from "../Searchbar/SearchResultsList";
import Topheader from "../Topheader/Topheader";
import ConnectionWarning from "../Alerts/ConnectionWarning";

export default function Layout({ children }) {
  const [results, setResults] = useState([]);

  return (
    <div className="layout">
      <div id="wrapper">
        <div id="navcontent">
          <ConnectionWarning/>
          <Navbar />
          <Searchbar setResults={setResults}  />
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