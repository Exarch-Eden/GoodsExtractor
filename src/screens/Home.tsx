// third-party libraries
import React, { ReactElement, useEffect, useState } from "react";
import ResultsTable from "../components/ResultsTable";

// components

// css
import "../styles/Home.css";
import "../styles/Universal.css";

// interfaces
import { Book } from "../types";

const serverLatestUrl = "http://localhost:8000/latest";

const fetchFailedMessage = "Failed to fetch data from server :(";

const Home = (): ReactElement => {
  // holds data regarding the latest releases
  const [latestData, setLatestData] = useState<Book[]>([]);

  // extract data of latest doujinshi releases
  useEffect(() => {
    (async () => {
      try {
        // request server to fetch data
        const res = await fetch(serverLatestUrl);
        const data = await res.json();

        // for testing purposes
        console.log("data: ");
        console.log(data);

        // overwrite previous data with newly-fetched data
        setLatestData(data);
      } catch (error) {
        console.log(
          "Error occurred while attempting to fetch data from server"
        );

        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="homeContainer">
      <div className="titleContainer verticalPadding">
        <p>Home Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        {/* <div className="homePopularContainer verticalPadding">
          <p>Popular</p>
        </div> */}
        <div className="homeLatestContainer verticalPadding">
          <p>Latest Title Releases</p>
          <ResultsTable results={latestData} />
          {
            latestData.length !== 0 ? 
            null :
            <p className="errorMessage">{fetchFailedMessage}</p>
          }
          {/* {renderLatestBooks(latestData)} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
