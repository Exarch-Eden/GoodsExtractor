// third-party libraries
import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// components

// css
import "../styles/PageNumbers.css";

const PageNumbers = () => {
  return (
    <div className="paginationIconsContainer">
      <ChevronLeftIcon />
      <p className="curPageNumber pageNumber">1</p>
      <p className="pageNumber">2</p>
      <p className="pageNumber">3</p>
      <ChevronRightIcon />
    </div>
  );
};

export default PageNumbers;
