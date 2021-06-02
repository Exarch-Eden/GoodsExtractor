const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const http = require("http");

const PORT = process.env.PORT || 8000;

const app = express();

const ENDPOINTS = { default: "/", latest: "/latest", title: "/title" };
const CODES = {
  200: 200,
  400: 400,
  401: 401,
  402: 402,
  403: 403,
  404: 404,
  405: 405,
  406: 406,
  500: 500,
  502: 502,
};

const BASE_URL = "https://nhentai.net/";
const INDIV_TITLE_SUFFIX = "g/";
const SEARCH_SUFFIX = "search/";

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
    const fetchRes = await fetch(BASE_URL);
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

    // console.log("bookTitles:");
    // console.table(bookTitles);
    console.log("successfully fetched data");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    res.send("Error occurred while fetching data").status(CODES[500]);
  }

  res.send(bookTitles);
});

app.get(ENDPOINTS.title, async (req, res) => {
  // for testing purposes
  const message = "Received GET request to /title endpoint";
  const id = req.query.id;

  // for testing purposes
  console.log("id: ", id);

  // holds the data extracted from the website
  // data is relevant to an id-specified doujinshi
  const bookData = {};

  if (!id) {
    res.send("Id query parameter was not specified").status(CODES[400]);
  }

  const targetUrl = `${BASE_URL}${INDIV_TITLE_SUFFIX}${id}`;

  // for testing purposes
  console.log("targetUrl: ", targetUrl);

  // removes any special characters (such as brackets or square brackets)
  const specialCharRegex = /\(|\)|\[|\]/g;

  // regex for extracting full-sized images from thumbnail src value
  const fullSizeFirstTRegex = /t\.nhentai\.net/g;
  const fullSizeLastTRegex = /\/[0-9]t/g;

  // element container for the cover image
  const coverTag = "#bigcontainer > #cover > a > img";

  // element container for the title, id, artist, and tags of the doujinshi
  const infoBlockTag = "#bigcontainer > #info-block > #info";
  const artistTag = `${infoBlockTag} > h1.title > .before`;
  const titleTag = `${infoBlockTag} > h1.title > .pretty`;
  // element containing info regarding the parody, language, and translator
  const othersTag = `${infoBlockTag} > h1.title > .after`;

  // element container for the page images
  const pageTag = "#thumbnail-container > .thumbs > .thumb-container > a";

  // TODO: change to access the actual page url itself and extract the image from there
  // rather than using the thumbnail image
  const imgTag = "img";

  try {
    console.log("fetching individual title data...");
    const fetchRes = await fetch(targetUrl);
    const html = await fetchRes.text();

    // for testing purposes
    // console.log("res text: \n", resHtml);
    // console.log("html: \n", html);

    const $ = cheerio.load(html);

    // extract cover image
    bookData.cover = $(coverTag).attr("data-src");

    // extract other relevant data about the doujinshi
    bookData.artist = $(artistTag).text().replace(specialCharRegex, "").trim();
    bookData.title = $(titleTag).text().replace(specialCharRegex, "").trim();

    // initialize page thumbnail images url array for bookData object
    bookData.thumbnails = [];

    bookData.pages = [];

    // extract the page image urls (thumbnail images for now)
    // will change to the full-sized images
    $(pageTag).each((index, element) => {
      const thumbnailUrl = $(element).find(imgTag).attr("data-src");

      // extracts the full-sized versions of the thumbnail images
      const fullSizeUrl = thumbnailUrl
        .replace(fullSizeFirstTRegex, "i.nhentai.net")
        .replace(fullSizeLastTRegex, `/${index + 1}`);

      bookData.thumbnails.push(thumbnailUrl);
      bookData.pages.push(fullSizeUrl);
    });

    // for extracting images
    // $(aTag).each((index, element) => {
    //   const title = $(element).find(captionTag).text();
    //   const coverUrl = $(element).find(imgTag).attr("data-src");

    //   // get the database id of the current book
    //   // cut off the first 3 characters, in this case it is "/g/"
    //   // since we only want the number
    //   const id = $(element).attr("href").replace(idRegex, "");

    // });

    console.log("successfully fetched individual title data");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    res.send("Error occurred while fetching data").status(CODES[500]);
  }

  res.send(bookData);
});

// app.get("/artist", (req, res) => {
//   const message = "Received GET request to /artist endpoint";
//   res.send(message);
// });

http
  .createServer(app)
  .listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
