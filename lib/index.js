const jumiaPrice = require('./JumiaPrice');
const kongaPrice = require('./checkkonga');
const runScraper = async search => {
  if (search == null) {
    return console.log(`please check what u are searching for `);
  }
  const product = await Promise.all([jumiaPrice(search), kongaPrice(search)]);
  return product;
};
// runScraper('iphone x');
module.exports = runScraper;
