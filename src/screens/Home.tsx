// third-party libraries
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

// components
import CardLayout from "../components/CardLayout";
import PageNumbers from "../components/Pagination/PageNumbers";
import PageNumbersLocal from "../components/Pagination/PageNumbersLocal";
import ResultsCard from "../components/ResultsCard";
import ResultsTable from "../components/ResultsTable";

// css
import "../styles/Home.css";
import "../styles/Universal.css";

// interfaces
import { Book } from "../types";

// local constants
import { serverLatestUrl } from "../backend/ServerURLS";

// const serverLatestUrl = "http://localhost:8000/latest";

type HomeRouteParams = {
  page?: string;
};

const fetchFailedMessage = "Failed to fetch data from server :(";

const paginationPath = "/";

/**
 * Placeholder value for the max page number.
 * As of the 15th of June 2021, the max page number is 14274
 */
const maxPageNumberPlaceholder = 14274;

const Home = (): ReactElement => {
  // holds data regarding the latest releases
  const [latestData, setLatestData] = useState<Book[]>([]);
  // holds the maximum page number available for this specific title
  // used mainly for pagination
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  // holds the current page number
  const [pageNumber, setPageNumber] = useState(1);

  const onChange = useCallback((newPageNumber: number) => {
    setPageNumber(newPageNumber);
  }, []);

  // const { page }: HomeRouteParams = useParams();

  // // change the page number if it is specified in the router params
  // useEffect(() => {
  //   if (page) {
  //     setPageNumber(parseInt(page));
  //   }
  // }, [page]);

  // initial fetch (this doesn't actually fetch only once)
  // useEffect(() => {
  //   console.log("initial fetch");
  // }, [])

  const fetchData = useCallback(async () => {
    try {
      // overwrite previous data with newly-fetched data
      // const retrievedData = await fetchLatestData();
      const retrievedData = await fetchLatestData(pageNumber);
      if (retrievedData) {
        setLatestData(retrievedData.bookTitles);
        setMaxPageNumber(parseInt(retrievedData.maxPageNumber));
      }
    } catch (error) {
      console.log(
        "Error occurred in outer trycatch block of fetchLatestData()"
      );

      console.error(error);
    }
  }, [pageNumber]);

  // extract data of latest doujinshi releases
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="homeContainer">
      <div className="titleContainer verticalPadding">
        <p>Home Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <div className="homeLatestContainer verticalPadding">
          <p>Latest Title Releases</p>
          <CardLayout results={latestData} />
          {latestData.length !== 0 ? null : (
            <p className="errorMessage">{fetchFailedMessage}</p>
          )}
        </div>
      </div>
      <PageNumbersLocal
        curPageNumber={pageNumber}
        maxPageNumber={maxPageNumber}
        onChange={onChange}
      />
      {/* <PageNumbers
        path={paginationPath}
        curPageNumber={pageNumber}
        maxPageNumber={maxPageNumber}
      /> */}
    </div>
  );
};

const fetchLatestData = async (pageNumber: number) => {
  // local server endpoint to fetch
  // if specified page number is greater than 1, append query parameter
  // otherwise, use default endpoint url
  // const targetUrl = serverLatestUrl;
  const targetUrl =
    pageNumber > 1 ? `${serverLatestUrl}?page=${pageNumber}` : serverLatestUrl;

  // holds the return data object
  let returnData = undefined;

  try {
    // request server to fetch data
    const res = await fetch(targetUrl);
    const data = await res.json();

    // for testing purposes
    console.log("data: ");
    // console.table(data);
    console.log("maxPageNumber: ", parseInt(data.maxPageNumber));

    // overwrite previous data with newly-fetched data
    returnData = data;
  } catch (error) {
    console.log("Error occurred while attempting to fetch data from server");
    console.error(error);
  }

  return returnData;
};

export default Home;
