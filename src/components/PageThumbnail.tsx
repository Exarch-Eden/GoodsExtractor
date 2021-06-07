/* eslint-disable jsx-a11y/img-redundant-alt */
// third-party libraries
import React, { ReactElement, useEffect, useState } from "react";
// import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import { red } from "@material-ui/core/colors";
// import { useParams } from "react-router-dom";

// components

// css
import "../styles/Universal.css";
import "../styles/PageThumbnail.css";
import { Link } from "react-router-dom";

// types

type PageThumbnailProps = {
  thumbnailSrc: string;
  id: string;
  index: number;
};

const PageThumbnail = ({
  thumbnailSrc,
  id,
  index,
}: PageThumbnailProps): ReactElement => {
  const dummyCover = "https://dummyimage.com/200x300/000/fff";

  const pageNumber = index + 1;

  // link to the page containing the full-sized image
  const pageLink = id !== "-1" ? `/title/${id}/${pageNumber}` : `/404`;

  return (
    <Link to={pageLink}>
      <img
        className="pageImage"
        src={thumbnailSrc || dummyCover}
        alt={`page ${index}`}
      />
    </Link>
  );
};

export default PageThumbnail;
