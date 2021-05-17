// third-party libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components

// css
import "../styles/Home.css";
import "../styles/Universal.css";

const serverLatestUrl = "http://localhost:8000/nh";

const renderLatestBooks = (books: String[]) => {
  // TODO: dynamically render table header with updated
  // books object

  // TODO: replace index in `/title/${index}` to prop of Link
  // with dynamic book id
  
  return (
    <table className="latestTable">
      <thead>
        <tr>
          <th>Titles</th>
        </tr>
      </thead>
      <tbody>
        {books.map((curTitle, index) => (
          <tr key={index}>
            <td key={index}>
              <Link to={`/title/${index}`} className="titleLink">
                {curTitle}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Home = () => {
  const [latestData, setLatestData] = useState([]);

  // extract data of latest doujinshi releases
  useEffect(() => {
    // request server to fetch data
    (async () => {
      try {
        const res = await fetch(serverLatestUrl);
        const data = await res.json();

        // for testing purposes
        console.log("data: ");
        console.log(data);

        setLatestData(data);
      } catch (error) {
        console.log(
          "Error occurred while attempting to fetch data from server"
        );

        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="homeContainer">
      <div className="titleContainer verticalPadding">
        <p>Home Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        {/* <div className="homePopularContainer verticalPadding">
          <p>Popular</p>
        </div> */}
        <div className="homeLatestContainer verticalPadding">
          <p>Latest Title Releases</p>
          {renderLatestBooks(latestData)}
        </div>
      </div>
    </div>
  );
};

export default Home;
