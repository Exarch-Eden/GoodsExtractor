const cheerio = require("cheerio");
const fetch = require("node-fetch");
const CODES = require("../constants/statusCodes").CODES;

exports.getLatest = async (res, targetUrl) => {
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
}