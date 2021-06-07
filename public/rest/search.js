const CODES = require("../constants/statusCodes").CODES;

exports.getSearch = async (res, targetUrl) => {
  // holds the titles of doujinshis found in the respective search page
  const searchTitles = [];

  try {
    console.log("fetching search data...");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    res.send("Error occurred while fetching search data").status(CODES[500]);
  }
}