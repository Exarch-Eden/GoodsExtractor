// third-party libraries
import React, { ReactElement } from "react";
import { Link as div } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// components
import PageLink from "./PageLink";

// css
import "../../styles/PageNumbers.css";
import "../../styles/Universal.css";

type PageNumbersProp = {
  curPageNumber: number;
  maxPageNumber: number;
  onChange: (newPageNumber: number) => void;
};

const MAX_VISIBLE_PAGE_NUMBERS = 3;

const PageNumbers = ({
  curPageNumber,
  maxPageNumber,
  onChange,
}: PageNumbersProp): ReactElement => {
  const prevPageNumber = curPageNumber - 1;
  const nextPageNumber = curPageNumber + 1;

  // const pathToLeft = path + `${prevPageNumber}`;
  // const pathToRight = path + `${nextPageNumber}`;

  // for testing purposes
  // console.log("maxPageNumber: ", maxPageNumber);
  // console.log("pathToLeft: ", pathToLeft);
  // console.log("pathToRight: ", pathToRight);

  return (
    <div className="paginationIconsContainer">
      {curPageNumber > 1 ? (
        <>
          <PageLink
            onChange={() => {
              onChange(prevPageNumber);
            }}
          >
            <ChevronLeftIcon />
          </PageLink>
          {/* <div className="titleLink">
            <ChevronLeftIcon />
          </div> */}
        </>
      ) : null}
      {renderPagination(curPageNumber, maxPageNumber, onChange)}
      {curPageNumber < maxPageNumber ? (
        <>
          <PageLink
            onChange={() => {
              onChange(nextPageNumber);
            }}
          >
            <ChevronRightIcon />
          </PageLink>
          {/* <div className="titleLink">
            <ChevronRightIcon />
          </div> */}
        </>
      ) : null}
    </div>
  );
};

const renderPagination = (
  curPageNumber: number,
  maxPageNumber: number,
  onChangePageNum: (newPageNumber: number) => void
) => {
  const prevPageNumber = curPageNumber - 1;
  const nextPageNumber = curPageNumber + 1;

  switch (curPageNumber) {
    case 1: // current page is first page
      return (
        <>
          <p className="curPageNumber pageNumber">{curPageNumber}</p>
          {nextPageNumber <= maxPageNumber ? (
            <PageLink
              onChange={() => {
                onChangePageNum(nextPageNumber);
              }}
            >
              <p className="pageNumber">{nextPageNumber}</p>
            </PageLink>
          ) : null}
          {nextPageNumber + 1 <= maxPageNumber ? (
            <PageLink
              onChange={() => {
                onChangePageNum(nextPageNumber + 1);
              }}
            >
              <p className="pageNumber">{nextPageNumber + 1}</p>
            </PageLink>
          ) : null}
        </>
      );
    case maxPageNumber: // current page is last page
      return (
        <>
          {prevPageNumber - 1 >= 1 ? (
            <PageLink
              onChange={() => {
                onChangePageNum(prevPageNumber - 1);
              }}
            >
              <p className="pageNumber">{prevPageNumber - 1}</p>
            </PageLink>
          ) : null}
          {prevPageNumber >= 1 ? (
            <PageLink
              onChange={() => {
                onChangePageNum(prevPageNumber);
              }}
            >
              <p className="pageNumber">{prevPageNumber}</p>
            </PageLink>
          ) : null}
          <p className="curPageNumber pageNumber">{curPageNumber}</p>
        </>
      );
    default:
      return (
        <>
          <PageLink
            onChange={() => {
              onChangePageNum(prevPageNumber);
            }}
          >
            <p className="pageNumber">{prevPageNumber}</p>
          </PageLink>
          <p className="curPageNumber pageNumber">{curPageNumber}</p>
          <PageLink
            onChange={() => {
              onChangePageNum(nextPageNumber);
            }}
          >
            <p className="pageNumber">{nextPageNumber}</p>
          </PageLink>
        </>
      );
  }
};

export default PageNumbers;
