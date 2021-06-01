// third-party libraries
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

// components

// css
import "../styles/CardLayout.css";
import "../styles/Universal.css";

// interfaces
import { Book, Pages } from "../types";
import PageThumbnail from "./PageThumbnail";
import ResultsCard from "./ResultsCard";

type CardLayoutProps = {
  results: Book[] | Pages;
  id?: string;
};

const CardLayout = ({ results, id }: CardLayoutProps): ReactElement => {
  return (
    <div className="cardLayoutContainer">
      {results.map((curResult: Book | string, index: number) => {
        // TODO: check for element type before rendering components
        // maybe a switch case:
        // case "book"
        // case "artist"
        // etc.

        // if the element is a string, it is meant to be the src value of
        // a page thumbnail image
        if (typeof curResult === "string") {
          return (
            // <img className="pageImage" src={curResult} alt={`page ${index}`} />
            <PageThumbnail thumbnailSrc={curResult} pageNumber={index} id={id || "-1"} />
          )
        }

        // card component for search or latest doujinshi results
        return <ResultsCard {...curResult} key={index} />;
      })}
    </div>
  );
};

export default CardLayout;
