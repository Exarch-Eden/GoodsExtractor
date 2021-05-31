// third-party libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components

// css
import "../styles/IndividualTitle.css";
import "../styles/Universal.css";

// local constants
import { serverTitleUrl } from "../backend/ServerURLS";

const IndividualTitle = () => {
  const [titleData, setTitleData] = useState();

  // holds the id parameter passed through react-router
  const { id }: { id: string } = useParams();

  // for testing purposes
  console.log("id: ", id);

  // extract data of id-specified doujinshi
  useEffect(() => {
    // appends the id of the doujinshi to the url used to 
    const urlWithId = `${serverTitleUrl}?id=${id}`;

    (async () => {
      try {
        // request server to fetch data
        const res = await fetch(urlWithId);
        const data = await res.json();

        console.log("retrieved title data:");
        console.log(data);
        
      } catch (error) {
        console.log(
          "Error occurred while attempting to fetch data from server"
        );

        console.log(error);
      }
    })();
  }, [])

  return (
    <div className="individualTitleContainer">
      <div className="titleContainer verticalPadding">
        <p>Individual Title Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <p>Id retrieved: {id}</p>
      </div>
    </div>
  );
};

export default IndividualTitle;
