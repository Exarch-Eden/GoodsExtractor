// third-party libraries
import React from "react";
import { Route, Switch, useParams } from "react-router-dom";

// components

// css
import "../styles/Universal.css";

// types
type ImagePageRouteParams = {
  id: string;
  page: string;
}

const ImagePage = () => {
  const { id, page }: ImagePageRouteParams = useParams();

  return (
    <div>
      <div className="titleContainer verticalPadding">
        <p>Image Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <p>id {id}</p>
        <p>page number {page}</p>
      </div>
    </div>
  );
};

export default ImagePage;
