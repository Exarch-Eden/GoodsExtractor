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
  pageNumber: number;
};

const PageThumbnail = ({
  thumbnailSrc,
  id,
  pageNumber,
}: PageThumbnailProps): ReactElement => {
  const dummyCover = "https://dummyimage.com/200x300/000/fff";

  return (
    <Link to={`/title/${id}/${pageNumber}`}>
      <img
        className="pageImage"
        src={thumbnailSrc || dummyCover}
        alt={`page ${pageNumber}`}
      />
    </Link>
  );
};

export default PageThumbnail;
