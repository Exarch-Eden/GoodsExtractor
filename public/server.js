const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const http = require("http");
const restLatest = require("./rest/latest");
const restTitle = require("./rest/title");
const restSearch = require("./rest/search");
const CODES = require("./constants/statusCodes").CODES;

const PORT = process.env.PORT || 8000;

const app = express();

/**
 * Map of URIs accessible to client.
 */
const ENDPOINTS = {
  default: "/",
  latest: "/latest",
  title: "/title",
  search: "/search",
};

// old code
// /**
//  * Map of status codes sent to client.
//  */
// const CODES = {
//   200: 200,
//   400: 400,
//   401: 401,
//   402: 402,
//   403: 403,
//   404: 404,
//   405: 405,
//   406: 406,
//   500: 500,
//   502: 502,
// };

// base url for target website
const BASE_URL = "https://nhentai.net/";
//
const INDIV_TITLE_SUFFIX = "g/";
//
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
/**
 * Fetches title, cover, and id of the latest doujinshi releases
 * in the home page of the target website.
 */
app.get(ENDPOINTS.latest, async (req, res) => {
  try {
    await restLatest.getLatest(res, BASE_URL);
  } catch (error) {
    console.error(error);
  }
});

// "/title"
/**
 * Fetches data of an id-specific doujinshi.
 */
app.get(ENDPOINTS.title, async (req, res) => {
  // id of specific doujinshi
  const id = req.query.id;

  // for testing purposes
  console.log("id: ", id);

  if (!id) {
    res.send("Id query parameter was not specified").status(CODES[400]);
  }

  const targetUrl = `${BASE_URL}${INDIV_TITLE_SUFFIX}${id}`;

  try {
    await restTitle.getTitle(res, targetUrl);
  } catch (error) {
    console.error(error);
  }
});

app.get(ENDPOINTS.search, async (req, res) => {
  // TODO: add query parameter for page number
  // if page number parameter is defined, 
  // append the value to the targetUrl:
  // &page={value}

  // used for replacing whitespace characters with +
  const searchInputRegex = /\s/g;

  const searchPreCheck = req.query.search;

  // for testing purposes
  console.log("search input: ", searchPreCheck);

  // check to see if search input is defined
  // return error 400 if not
  if (!searchPreCheck) {
    res.send("search query parameter was not specified").status(CODES[400]);
  }

  // after confirming search input is indeed a string,
  // replace any whitespace characters with +
  const searchPostCheck = searchPreCheck.replace(searchInputRegex, "+");

  const targetUrl = `${BASE_URL}${SEARCH_SUFFIX}?q=${searchPostCheck}`;

  // for testing purposes
  console.log("targetUrl: ", targetUrl);
  // res.send(targetUrl);
  
  try {
    await restSearch.getSearch(res, targetUrl);
  } catch (error) {
    console.error(error);
  }

  // for testing purposes
  // console.log("end of search get request");
});

// app.get("/artist", (req, res) => {
//   const message = "Received GET request to /artist endpoint";
//   res.send(message);
// });

http
  .createServer(app)
  .listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
