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
const aTag = ".container > .gallery a";
// holds the title value
const captionTag = ".caption";
// holds the cover image
const imgTag = "img";
// anchor for the last page pagination icon
const maxPageTag = ".pagination > .last";

exports.getSearch = async (res, targetUrl) => {
  // data object to be sent
  // holds the book titles and the max page number value
  const sendData = {};

  // holds the titles of doujinshis found in the respective search page
  const bookTitles = [];

  try {
    console.log("fetching search data...");
    const fetchRes = await fetch(targetUrl);
    const html = await fetchRes.text();

    const $ = cheerio.load(html);

    $(aTag).each((index, element) => {
      const title = $(element).find(captionTag).text();
      const coverUrl = $(element).find(imgTag).attr("data-src");

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

    // console.log("maxPageNumber: ", maxPageNumber);

    sendData.bookTitles = bookTitles;
    sendData.maxPageNumber = maxPageNumber;

    console.log("successfully fetched search data");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.error(error);
    console.log("\n");
    res.send("Error occurred while fetching search data").status(CODES[500]);
    return;
  }

  res.send(sendData);
};
