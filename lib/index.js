const jumiaPrice = require("./JumiaPrice");
const kongaPrice = require("./checkkonga");
const launchBrowser = require("./launchBrowser");
const runScraper = async search => {
  if (search == null) {
    return console.log(`please check what u are searching for `);
  }
  // Class the launchBrowser() and gets a browser instance
  const browser = await launchBrowser();

  //Opens a new page (tab) for each scraper functions
  const product = await Promise.all([
    jumiaPrice(await browser.newPage(), search),
    kongaPrice(await browser.newPage(), search)
  ]);

  //closes the browser
  await browser.close();
  return product;
};
// runScraper('iphone x');
module.exports = runScraper;
