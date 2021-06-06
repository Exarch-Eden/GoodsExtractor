/* eslint-disable jsx-a11y/img-redundant-alt */
// third-party libraries
import React, { useEffect, useState } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import PageNumbers from "../components/PageNumbers";

// components

// css
import "../styles/Universal.css";
import { SessionData } from "../types";

// types
type ImagePageRouteParams = {
  id: string;
  page: string;
};

const fetchImagePageData = async () => {
  // uncomment later
  // const res = await fetch("");
  // const data = await res.json();

  // for testing purposes
  console.log("fetchImagePageData()");
};

const dummyImageLink = "";

const ImagePage = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [maxPageNumber, setMaxPageNumber] = useState(1);

  // for testing purposes
  // console.log("ImagePage RENDER");
  console.log("imageSrc: ", imageSrc);

  const { id, page }: ImagePageRouteParams = useParams();

  const pageNumber = parseInt(page);

  useEffect(() => {
    // attempt to get page url from session data
    const sessionDataStringified = window.sessionStorage.getItem("pages");

    // if sessionData is available, parse and extract respective page url based on
    // page number value
    if (sessionDataStringified) {
      // for testing purposes
      console.log("found session storage data");
      try {
        // session data string formatted to JSON
        const sessionData: SessionData = JSON.parse(sessionDataStringified);

        // if the id from the session data matches that of the id passed as
        // paramter from router,
        // then extract the page url
        if (sessionData.id === id) {
          const index = pageNumber - 1;
          setImageSrc(sessionData.pages[index]);
          setMaxPageNumber(sessionData.pages.length);
        }
      } catch (error) {
        console.log(error);
        console.log("Error attempting to extract data from session storage");
        console.log("Resorting to local server GET image request");
        fetchImagePageData();
      }
    } else {
      console.log("failed to find session storage data");
      console.log("Resorting to local server GET image request");

      fetchImagePageData();
    }
  }, [id]);

  useEffect(() => {
    // attempt to get page url from session data
    const sessionDataStringified = window.sessionStorage.getItem("pages");

    if (sessionDataStringified) {
      // session data string formatted to JSON
      const sessionData: SessionData = JSON.parse(sessionDataStringified);
      const index = pageNumber - 1;
      setImageSrc(sessionData.pages[index]);
    }
  }, [pageNumber]);

  const pathNoPageNumber = `/title/${id}/`;

  return (
    <div>
      <div className="titleContainer verticalPadding">
        <p>Image Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        {/* for testing purposes */}
        {/* <p>id {id}</p>
        <p>page number {pageNumber}</p> */}
        {imageSrc !== "" ? (
          <img
            className="fullImage"
            src={imageSrc}
            alt={`image ${pageNumber} for book ${id}`}
          />
        ) : null}
      </div>
      <PageNumbers
        path={pathNoPageNumber}
        curPageNumber={pageNumber}
        maxPageNumber={maxPageNumber}
      />
    </div>
  );
};

export default ImagePage;
