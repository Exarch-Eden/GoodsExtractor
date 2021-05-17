// third-party libraries
import React from "react";
import { useParams } from "react-router-dom";

// components

// css
import "../styles/IndividualTitle.css";
import "../styles/Universal.css";

const IndividualTitle = () => {
  // holds the id parameter passed through react-router
  const { id }: { id: string } = useParams();

  // for testing purposes
  console.log("id: ", id);

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
