const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const http = require("http");

const PORT = process.env.PORT || 8000;

const app = express();

const ENDPOINTS = { default: "/", latest: "/latest", title: "/title" };

const nHUrl = "https://nhentai.net/";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

const generateEndpointsTable = () => {
  const messagePart1 = `This is the server used for GoodsExtractor
    <br>
    Below are the endpoints used:
    <br>
    <table>
    <thead>
    <tr>
    <th>Caption</th>
    <th>URL Endpoint</th>
    </tr>
    </thead>
    <tbody>`;

  let messagePart2 = ``;
  for (const curEndpoint in ENDPOINTS) {
    messagePart2 += `<tr>
    <td>
    ${curEndpoint}
    </td>
    <td>
    ${ENDPOINTS[curEndpoint]}
    </td>
    </tr>`;
  }

  const messagePart3 = `</tbody>
    </table>`;

  return `${messagePart1}${messagePart2}${messagePart3}`;
};

// "/"
app.get(ENDPOINTS.default, async (req, res) => {
  const apiMessage = generateEndpointsTable();
  res.send(apiMessage);
});

// "/latest"
app.get(ENDPOINTS.latest, async (req, res) => {
  // holds the titles of posts found in the reddit page
  const bookTitles = [];

  // get HTML data from r/programming in reddit
  try {
    console.log("fetching data...");
    const fetchRes = await fetch(nHUrl);
    const html = await fetchRes.text();

    // for testing purposes
    // console.log("res text: \n", resHtml);
    // console.log("html: \n", html);

    const $ = cheerio.load(html);

    const aTag = `.container > .gallery > a`;
    // holds the tag to access the caption (title) of the current book
    const captionTag = `.caption`;
    const imgTag = `img`;

    // removes the backslashes and g characters from the href attribute of
    // a element
    const idRegex = /\/|g/g;

    $(aTag).each((index, element) => {
      const title = $(element).find(captionTag).text();
      const coverUrl = $(element).find(imgTag).attr("data-src");

      // get the database id of the current book
      // cut off the first 3 characters, in this case it is "/g/"
      // since we only want the number
      const id = $(element).attr("href").replace(idRegex, "");

      bookTitles.push({
        id: id,
        title: title,
        cover: coverUrl,
      });
    });

    console.log("bookTitles:");
    console.table(bookTitles);
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    res.send("Error occurred while fetching data");
  }

  res.send(bookTitles);
});

// app.get("/book", (req, res) => {
//   const message = "Received GET request to /book endpoint";
//   res.send(message);
// });

// app.get("/artist", (req, res) => {
//   const message = "Received GET request to /artist endpoint";
//   res.send(message);
// });

http
  .createServer(app)
  .listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
