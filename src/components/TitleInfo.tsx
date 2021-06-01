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
import "../styles/TitleInfo.css";

// types
import { Book } from "../types";

const TitleInfo = ({ id, title, cover, artist }: Book): ReactElement => {

  const dummyCover = "https://dummyimage.com/350x502/000/fff";
  return (
    <div className="titleInfoContainer verticalPadding">
      <div className="coverContainer">
        <img className="indivTitleCoverImage" src={cover || dummyCover} alt={`Cover image for ${id}`} />
      </div>
      <div className="otherInfoContainer verticalPadding">
        <p>{title || "title unknown"}</p>
        <p>{`by ${artist}`|| `artist unknown`}</p>
        <p>id {id}</p>
        {/* <p>Title here</p>
        <p>by artist</p>
        <p>id 1234</p> */}
      </div>
    </div>
  );
};

{/* const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90vw",
      display: "inline-block",
      margin: 10,
    },
    media: {
      width: 350,
      height: 502,
      // paddingTop: "56.25%", // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
); */}

export default TitleInfo;
