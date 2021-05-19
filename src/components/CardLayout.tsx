// third-party libraries
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

// components

// css
import "../styles/CardLayout.css";
import "../styles/Universal.css";

// interfaces
import { Book } from "../types";
import ResultsCard from "./ResultsCard";

type CardLayoutProps = {
  results: Book[];
};

const CardLayout = ({ results }: CardLayoutProps): ReactElement => {
  return (
    <div className="cardLayoutContainer">
      {results.map((curResult, index) => {
        // TODO: check for element type before rendering components
        // maybe a switch case:
        // case "book"
        // case "artist"
        // etc.

        return <ResultsCard {...curResult} key={index} />;
      })}
    </div>
  );
};

export default CardLayout;
