// third-party libraries
import React, { ReactElement } from "react";

// components

// css
import "../../styles/PageNumbers.css";
import "../../styles/Universal.css";

type PageLinkProps = {
  onChange: () => void;
  children?: React.ReactNode;
};

const PageLink = ({ onChange, children }: PageLinkProps): ReactElement => {
  return (
    <div className="titleLink" onClick={onChange}>
      {children}
    </div>
  );
};

export default PageLink;
