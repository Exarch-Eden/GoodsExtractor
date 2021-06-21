const cheerio = require("cheerio");
const fetch = require("node-fetch");
const CODES = require("../constants/statusCodes").CODES;

// removes the backslashes and g characters from the href attribute of
// a element
const idRegex = /\/|g/g;
// for extraction of max page value from href
// which is located at the very end of the string
const maxPageValueRegex = /[0-9]+$/g;

// anchor container for the title, id, and cover
const aTag = `.container > .gallery > a`;
// holds the title value
const captionTag = `.caption`;
// holds the cover image
const imgTag = `img`;
// anchor for the last page pagination icon
const maxPageTag = ".pagination > .last";

exports.getLatest = async (res, targetUrl) => {
  // data object to be sent
  // holds the book titles and the max page number value
  const sendData = {};

  // holds the titles of doujinshis in the home page
  const bookTitles = [];

  try {
    console.log("fetching data...");
    const fetchRes = await fetch(targetUrl);
    const html = await fetchRes.text();

    // for testing purposes
    // console.log("res text: \n", resHtml);
    // console.log("html: \n", html);

    const $ = cheerio.load(html);

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

    // the anchor href value
    const lastPageNumHref = $(maxPageTag).attr("href");
    // get the page number value only
    const maxPageNumber = lastPageNumHref ? lastPageNumHref.match(maxPageValueRegex).join("") : undefined;

    sendData.bookTitles = bookTitles;
    sendData.maxPageNumber = maxPageNumber;

    // console.log("bookTitles:");
    // console.table(bookTitles);
    console.log("successfully fetched data");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    res.send("Error occurred while fetching data").status(CODES[500]);
    return;
  }

  res.send(sendData);
};
