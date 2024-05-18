import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import data from "../../data/items.json";

import "./Searchbar.css";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm, selectedOption);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="drop">
        <select
          className="dropdown"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <option value="all"> Categories</option>
          {data.options.map((option) => (
            <option key={option.id} value={option.categoryName}>
              {option.categoryName}
            </option>
          ))}
        </select>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />

      <button className="search-button" onClick={handleSearchClick}>
        <RiSearchLine style={{ fontSize: "31px" }} />
      </button>

      <div className="horizontal-line"></div>
    </div>
  );
};

export default Searchbar;
