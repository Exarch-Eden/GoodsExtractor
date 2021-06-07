// third-party libraries
import React from "react";

// components
import SearchInput from "../components/SearchInput";

// css
import "../styles/Home.css";
import "../styles/Universal.css";

const Search = () => {
  return (
    <div className="searchContainer">
      <div className="titleContainer verticalPadding">
        <p>Search Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <SearchInput />
      </div>
    </div>
  );
};

export default Search;
