// third-party libraries
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

// components
import SearchInput from "../components/SearchInput";
import CardLayout from "../components/CardLayout";
import PageNumbers from "../components/Pagination/PageNumbers";

// css
import "../styles/Home.css";
import "../styles/Universal.css";

// local constants
import { serverSearchUrl } from "../backend/ServerURLS";

// types
import { Book } from "../types";
import PageNumbersLocal from "../components/Pagination/PageNumbersLocal";

type SearchRouteParams = {
  page?: string;
};

const fetchFailedMessage = "Failed to fetch data from server :(";

const paginationPath = "/search/";

/**
 * Used to remove whitespace between keywords for search input
 * before sending to server to fetch search data.
 */
const searchInputRegex = /\s/g;

const Search = () => {
  // holds data regarding the titles relevant to the search input
  const [searchData, setSearchData] = useState<Book[]>([]);
  // holds the maximum page number available for this specific title
  // used mainly for pagination
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  // holds the current page number
  const [pageNumber, setPageNumber] = useState(1);
  const [formattedSearchInput, setFormattedSearchInput] = useState("");

  console.log("SEARCH page RENDER");

  // const { page }: SearchRouteParams = useParams();

  // // change the page number if it is specified in the router params
  // useEffect(() => {
  //   if (page) {
  //     setPageNumber(parseInt(page));
  //   }
  // }, [page]);

  /**
   * Changes the page number value and is used by pagination.
   */
  const onChange = useCallback((newPageNumber: number) => {
    setPageNumber(newPageNumber);
  }, []);

  /**
   * Fetches data when page number changes (due to pagination).
   */
  const fetchDataPagination = useCallback(async () => {
    if (!formattedSearchInput) {
      return;
    }

    try {
      console.log("updating data because of page number");

      const retrievedData = await fetchSearchData(
        formattedSearchInput,
        pageNumber
      );

      if (retrievedData) {
        setSearchData(retrievedData.bookTitles);
      }
    } catch (error) {
      console.log(
        `Error occurred on outer tryblock of 
          onEnterPress() with specified page number parameter`
      );
      console.error(error);
    }
  }, [formattedSearchInput, pageNumber]);

  // update the search data if the page number changes
  useEffect(() => {
    fetchDataPagination();
  }, [fetchDataPagination]);

  /**
   * Used for the onKeyDown property of MaterialUI's Textfield
   * element. Fetches search data before overwriting previous values
   * of searchData, maxPageNumber, and formattedSearchInput.
   *
   * @param searchInput the input from the search bar
   */
  const onKeyDown = useCallback(async (searchInput: string) => {
    try {
      const newSearchData = await fetchSearchData(searchInput);
      // const newSearchData = await onEnterPress(searchInput, pageNumber);

      // for testing purposes
      console.log("newSearchData: ");
      console.table(newSearchData);

      setSearchData(newSearchData.bookTitles);
      if (newSearchData.maxPageNumber) {
        setMaxPageNumber(newSearchData.maxPageNumber);
      }
      setFormattedSearchInput(newSearchData.formattedSearchInput);
    } catch (error) {
      console.log("Error occurred within onKeyDown()");
      console.error(error);
    }
  }, []);

  return (
    <div className="searchContainer">
      <div className="titleContainer verticalPadding">
        <p>Search Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <SearchInput onKeyDown={onKeyDown} />
        <div className="verticalPadding">
          <p>Search-Related Titles</p>
          <CardLayout results={searchData} />
          {/* {searchData.length !== 0 ? null : (
            <p className="errorMessage">{fetchFailedMessage}</p>
          )} */}
        </div>
      </div>
      {formattedSearchInput ? (
        <PageNumbersLocal
          curPageNumber={pageNumber}
          maxPageNumber={maxPageNumber}
          onChange={onChange}
        />
      ) : null}
      {/* {formattedSearchInput ? (
        <PageNumbers
          path={paginationPath}
          curPageNumber={pageNumber}
          maxPageNumber={maxPageNumber}
        />
      ) : null} */}
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
const fetchSearchData = async (searchInput: string, pageNumber?: number) => {
  // holds the fetched titles related to the search input
  let bookTitles: Book[] = [];
  let maxPageNumber = undefined;

  // console.log("ENTER key input: ", event.target.value);
  console.log("ENTER key input: ", searchInput);

  // trimmed and space-free search input
  // formatted as such for query parameter of target website
  const formattedInput = searchInput.trim().replace(searchInputRegex, "+");

  // url with search query parameter filled
  let targetUrl = `${serverSearchUrl}?search=${formattedInput}`;

  // optional page number query parameter
  if (pageNumber && pageNumber > 1) {
    targetUrl += `&page=${pageNumber}`;
  }

  // for testing purposes
  console.log("urlWithSearchInput: ", targetUrl);

  // send search input to server and retrieve respective data
  try {
    console.log("fetching search data from server...");
    const res = await fetch(targetUrl);
    const data = await res.json();

    // for testing purposes
    // console.log(data);
    // console.table(data);

    bookTitles = data.bookTitles;
    if (data.maxPageNumber) {
      maxPageNumber = parseInt(data.maxPageNumber);
    }

    console.log("maxPageValue: ", maxPageNumber);
  } catch (error) {
    console.log("Error occurred while attempting to fetch search data");
    console.error(error);
  }

  return {
    bookTitles: bookTitles,
    maxPageNumber: maxPageNumber,
    formattedSearchInput: formattedInput,
  };
};

export default Search;
