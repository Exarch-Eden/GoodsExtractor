// third-party libraries
import React, { useState } from "react";

// components
import SearchInput from "../components/SearchInput";

// css
import "../styles/Home.css";
import "../styles/Universal.css";

// local constants
import { serverSearchUrl } from "../backend/ServerURLS";

// types
import { Book } from "../types";
import CardLayout from "../components/CardLayout";

const fetchFailedMessage = "Failed to fetch data from server :(";

/**
 * Used to remove whitespace between keywords for search input
 * before sending to server to fetch search data.
 */
const searchInputRegex = /\s/g;

const Search = () => {
  // holds data regarding the titles relevant to the search input
  const [searchData, setSearchData] = useState<Book[]>([]);

  /**
   * Used for the onKeyDown property of MaterialUI's Textfield
   * element. Executes onEnterPress and waits for the fetched
   * data before setting it as the searchData value.
   * 
   * @param searchInput the input from the search bar
   */
  const onKeyDown = async (searchInput: string) => {
    try {
      const newSearchData = await onEnterPress(searchInput);
      console.log("newSearchData: ");
      console.table(newSearchData);
      setSearchData(newSearchData);
    } catch (error) {
      console.log("Error occurred within onKeyDown()");
      console.error(error);
    }
  };

  return (
    <div className="searchContainer">
      <div className="titleContainer verticalPadding">
        <p>Search Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <SearchInput
          onKeyDown={onKeyDown}
        />
        <div className="verticalPadding">
          <p>Search-Related Titles</p>
          <CardLayout results={searchData} />
          {/* {searchData.length !== 0 ? null : (
            <p className="errorMessage">{fetchFailedMessage}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

/**
 * Function executed by MaterialUI's Textfield when the ENTER key is
 * pressed. It utilizes the search input to fetch and return search-related
 * data from the local server.
 * 
 * @param searchInput the input from the search bar
 * @returns the fetched titles related to the search data on success;
 * otherwise, a blank array
 */
const onEnterPress = async (searchInput: string) => {
  // holds the fetched titles related to the search input
  let searchData: Book[] = [];

  // console.log("ENTER key input: ", event.target.value);
  console.log("ENTER key input: ", searchInput);

  // trimmed and space-free search input
  // formatted as such for query parameter of target website
  const formattedInput = searchInput.trim().replace(searchInputRegex, "+");

  // url with search query parameter filled
  const urlWithSearchInput = `${serverSearchUrl}?search=${formattedInput}`;

  // for testing purposes
  console.log("urlWithSearchInput: ", urlWithSearchInput);

  // send search input to server and retrieve respective data
  try {
    console.log("fetching search data from server...");
    const res = await fetch(urlWithSearchInput);
    const data = await res.json();

    // for testing purposes
    // console.log(data);
    // console.table(data);

    searchData = data;
  } catch (error) {
    console.log(error);
    console.log("Error occurred while attempting to fetch search data");
  }

  return searchData;
};

export default Search;
