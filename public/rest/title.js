const cheerio = require("cheerio");
const fetch = require("node-fetch");
const CODES = require("../constants/statusCodes").CODES;

exports.getTitle = async (res, targetUrl, statusCodes) => {
  // holds the data extracted from the website
  // data is relevant to an id-specified doujinshi
  const bookData = {};

  // for testing purposes
  console.log("targetUrl: ", targetUrl);

  // removes any special characters (such as brackets or square brackets)
  const specialCharRegex = /\(|\)|\[|\]/g;

  // regex for extracting full-sized images from thumbnail src value
  const fullSizeFirstTRegex = /t\.nhentai\.net/g;
  const fullSizeLastTRegex = /\/[0-9]+t/g;
  // old code
  // const fullSizeLastTRegex = /\/[0-9]t/g;

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
    res
      .send("Error occurred while fetching individual title data")
      .status(CODES[500]);
  }

  res.send(bookData);
}