// third-party libraries
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// components

// css
import "../../styles/PageNumbers.css";
import "../../styles/Universal.css";

type PageNumbersProp = {
  path: string;
  curPageNumber: number;
  maxPageNumber: number;
};

const MAX_VISIBLE_PAGE_NUMBERS = 3;

const PageNumbers = ({
  path,
  curPageNumber,
  maxPageNumber,
}: PageNumbersProp): ReactElement => {
  const prevPageNumber = curPageNumber - 1;
  const nextPageNumber = curPageNumber + 1;

  const pathToLeft = path + `${prevPageNumber}`;
  const pathToRight = path + `${nextPageNumber}`;

  // for testing purposes
  // console.log("maxPageNumber: ", maxPageNumber);
  // console.log("pathToLeft: ", pathToLeft);
  // console.log("pathToRight: ", pathToRight);

  return (
    <div className="paginationIconsContainer">
      {curPageNumber > 1 ? (
        <>
          <Link to={pathToLeft} className="titleLink">
            <ChevronLeftIcon />
          </Link>
        </>
      ) : null}
      {renderPagination(curPageNumber, maxPageNumber, path)}
      {curPageNumber < maxPageNumber ? (
        <>
          <Link to={pathToRight} className="titleLink">
            <ChevronRightIcon />
          </Link>
        </>
      ) : null}
    </div>
  );
};

const renderPagination = (
  curPageNumber: number,
  maxPageNumber: number,
  path: string
) => {
  const prevPageNumber = curPageNumber - 1;
  const nextPageNumber = curPageNumber + 1;

  switch (curPageNumber) {
    case 1: // current page is first page
      return (
        <>
          <p className="curPageNumber pageNumber">{curPageNumber}</p>
          {nextPageNumber <= maxPageNumber ? (
            <Link to={`${path}${nextPageNumber}`} className="titleLink">
              <p className="pageNumber">{nextPageNumber}</p>
            </Link>
          ) : null}
          {nextPageNumber + 1 <= maxPageNumber ? (
            <Link to={`${path}${nextPageNumber + 1}`} className="titleLink">
              <p className="pageNumber">{nextPageNumber + 1}</p>
            </Link>
          ) : null}
        </>
      );
    case maxPageNumber: // current page is last page
      return (
        <>
          {prevPageNumber - 1 >= 1 ? (
            <Link to={`${path}${prevPageNumber - 1}`} className="titleLink">
              <p className="pageNumber">{prevPageNumber - 1}</p>
            </Link>
          ) : null}
          {prevPageNumber >= 1 ? (
            <Link to={`${path}${prevPageNumber}`} className="titleLink">
              <p className="pageNumber">{prevPageNumber}</p>
            </Link>
          ) : null}
          <p className="curPageNumber pageNumber">{curPageNumber}</p>
        </>
      );
    default:
      return (
        <>
          <Link to={`${path}${prevPageNumber}`} className="titleLink">
            <p className="pageNumber">{prevPageNumber}</p>
          </Link>
          <p className="curPageNumber pageNumber">{curPageNumber}</p>
          <Link to={`${path}${nextPageNumber}`} className="titleLink">
            <p className="pageNumber">{nextPageNumber}</p>
          </Link>
        </>
      );
  }
};

// OLD CODE
// tried to make dynamic for loop that iterates and generate a new paragraph element
// a maximum of 3 times

// const renderPagination = (curPageNumber: number, maxPageNumber: number) => {
//   const prevPageNumber = curPageNumber - 1;
//   const nextPageNumber = curPageNumber + 1;

//   // let pagination: ReactElement = (
//   // <>
//   //   <p className="pageNumber">{prevPageNumber}</p>
//   //   <p className="curPageNumber pageNumber">{curPageNumber}</p>
//   //   <p className="pageNumber">{nextPageNumber}</p>
//   // </>
//   // );

//   const pagination: ReactElement[] = [];

//   if (curPageNumber === 1) {
//     // is the very first page
//     for (
//       let index = curPageNumber, counter = 0;
//       counter <= MAX_VISIBLE_PAGE_NUMBERS && index <= maxPageNumber;
//       index++, counter++
//     ) {
//       const className =
//         index === curPageNumber ? "curPageNumber pageNumber" : "pageNumber";

//       pagination.push(
//         <p key={index - 1} className={className}>
//           {index}
//         </p>
//       );
//     }
//   } else if (curPageNumber === maxPageNumber) {
//   }

//   return pagination;
// };

export default PageNumbers;
