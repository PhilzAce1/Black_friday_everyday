const puppeteer = require('puppeteer');
const { jumiaPrice } = require('./JumiaPrice');
const kongaPrice = require('./checkkonga');
const openBrowser = async () => {
  return await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
    defaultViewport: null
  });
};
const runScraper = async search => {
  const product = await Promise.all([jumiaPrice(search), kongaPrice(search)]);
  return product;
};
module.exports = { openBrowser, runScraper };
