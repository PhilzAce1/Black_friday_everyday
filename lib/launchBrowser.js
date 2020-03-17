const puppeteer = require("puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
    defaultViewport: null
  });
  console.log("BROWSER LAUNCHED");
  return browser;
};
