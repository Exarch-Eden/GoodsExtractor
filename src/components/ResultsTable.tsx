// third-party libraries
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

// components

// css
import "../styles/Results.css";
import "../styles/Universal.css";

// interfaces
import { Book } from "../types";

type ResultsTableProps = {
  results: Book[];
};

const ResultsTable = ({ results }: ResultsTableProps): ReactElement => {
  // TODO: dynamically render table header with updated
  // books object

  return (
    <table className="resultsTable">
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {results.map((curResult, index) => (
          // TODO: check for element type before rendering components
          // maybe a switch case:
          // case "book"
          // case "artist"
          // etc.
          <tr key={index}>
            <td>
              <Link to={`/title/${curResult.id}`} className="titleLink">
                <img
                  src={curResult.cover}
                  alt={`cover for book ${curResult.id}`}
                  className="tableCoverImage"
                />
              </Link>
            </td>
            <td>
              <Link to={`/title/${curResult.id}`} className="titleLink">
                {curResult.title}
              </Link>
            </td>
            <td>
              <Link to={`/title/${curResult.id}`} className="titleLink">
                {curResult.id}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
