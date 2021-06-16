/* eslint-disable jsx-a11y/img-redundant-alt */
// third-party libraries
import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import PageNumbers from "../components/PageNumbers";

// components

// css
import "../styles/Universal.css";
import "../styles/ImagePage.css";

// types
import { Pages, SessionData } from "../types";

type ImagePageRouteParams = {
  id: string;
  page: string;
};

const ImagePage = () => {
  // holds the src value of the current image to display
  const [imageSrc, setImageSrc] = useState("");
  // holds the src values of all the images belonging to the id-specified title
  const [imageArray, setImageArray] = useState<Pages>([]);
  // holds the maximum page number available for this specific title
  // used mainly for pagination
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  // holds the current page number
  const [pageNumber, setPageNumber] = useState(1);

  // for testing purposes
  console.log("ImagePage RENDER");
  // console.log("imageSrc: ", imageSrc);

  const { id, page }: ImagePageRouteParams = useParams();

  useEffect(() => {
    setPageNumber(parseInt(page));
  }, [page]);

  useEffect(() => {
    console.log("added event listener");
    const pageKeyHandler = (event: any) => {
      console.log(`${pageNumber}, max: ${maxPageNumber}`);
      if (pageNumber < maxPageNumber) {
        // navigate to next page
        if (event.key === "D" || event.key === "ArrowRight") {
          console.log(">");

          setPageNumber(pageNumber + 1);
        }
      }
      if (pageNumber > 1) {
        // navigate to previous page
        if (event.key === "A" || event.key === "ArrowLeft") {
          console.log("<");

          setPageNumber(pageNumber - 1);
        }
      }
    };

    window.addEventListener("keydown", pageKeyHandler);

    // addPageKeyListeners(pageNumber, maxPageNumber, setPageNumber);

    return () => {
      window.removeEventListener("keydown", pageKeyHandler);
    };
  }, [pageNumber, maxPageNumber]);
  // number parsed from stringified parameter value

  // old code
  // const pageNumber = parseInt(page);

  // listen for left and right arrow keys or WASD keys

  // initial session data extraction triggered by change in id value
  // id is representative of one title
  // change in id (title) means change in entire images to display
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
        // parameter from router, then extract the page url
        if (sessionData.id === id) {
          const index = pageNumber - 1;
          setImageSrc(sessionData.pages[index]);
          setMaxPageNumber(sessionData.pages.length);
          setImageArray(sessionData.pages);
        } // end if
      } catch (error) {
        console.log(error);
        console.log("Error attempting to extract data from session storage");
        console.log("Resorting to local server GET image request");
        fetchImagePageData();
      } // end trycatch
    } else {
      console.log("failed to find session storage data");
      console.log("Resorting to local server GET image request");

      fetchImagePageData();
    } // end ifelse
  }, [id]);

  // updates image src whenever the page number is changed
  useEffect(() => {
    const index = pageNumber - 1;
    setImageSrc(imageArray[index]);

    // addPageKeyListeners(pageNumber, maxPageNumber, setPageNumber);

    // old code
    // // attempt to get page url from session data
    // const sessionDataStringified = window.sessionStorage.getItem("pages");

    // if (sessionDataStringified) {
    //   // session data string formatted to JSON
    //   const sessionData: SessionData = JSON.parse(sessionDataStringified);
    //   const index = pageNumber - 1;
    //   setImageSrc(sessionData.pages[index]);
    // }
  }, [pageNumber, imageArray]);

  // router path string lacking a second parameter
  // used for pagination (component sets the second parameter value itself)
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

const addPageKeyListeners = (
  curPageNumber: number,
  maxPageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  window.addEventListener("keydown", (event) => {
    console.log(`${curPageNumber}, max: ${maxPageNumber}`);

    if (curPageNumber < maxPageNumber) {
      // navigate to next page
      if (event.key === "D" || event.key === "ArrowRight") {
        console.log(">");

        setPageNumber(curPageNumber + 1);
      }
    }
    if (curPageNumber > 1) {
      // navigate to previous page
      if (event.key === "A" || event.key === "ArrowLeft") {
        console.log("<");

        setPageNumber(curPageNumber - 1);
      }
    }
  });
};

const fetchImagePageData = async () => {
  // uncomment later
  // const res = await fetch("");
  // const data = await res.json();

  // for testing purposes
  console.log("fetchImagePageData()");
};

export default ImagePage;
