// const { openBrowser } = require('./index');
// const { sortAlgo } = require('./JumiaPrice');
const puppeteer = require('puppeteer');
// const { jumiaPrice } = require('./JumiaPrice');
// const kongaPrice = require('./checkkonga');
const openBrowser = async () => {
  return await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
    defaultViewport: null
  });
};
const kongaPrice = async searchParam => {
  if (searchParam == null) return console.log('check what u searched');
  const search = searchParam.replace(/[^A-Za-z0-9]/g, '%20');

  // .split(' ').join('%20');
  console.log(search);
  const x = `https://www.konga.com/search?search=${search}`;
  const browser = await openBrowser();
  const page = await browser.newPage();
  await page.setDefaultTimeout(0);
  await page.goto(x);
  await page.waitForNavigation();
  await page.waitFor(4000);
  const link = await page.evaluate(() => {
    var newArray = [];
    Array.from(document.querySelectorAll('.bbe45_3oExY'))

      .filter(
        x =>
          x.querySelector('.af885_1iPzH') != null &&
          x.querySelector('.d7c0f_sJAqi') != null &&
          x.querySelector('a') != null
      )
      .map(x =>
        newArray.push({
          site: 'konga',
          name: x.querySelector('.af885_1iPzH').textContent,
          price: x.querySelector('.d7c0f_sJAqi').textContent,
          link: x.querySelector('a').href
        })
      );
    return newArray;
  });
  await browser.close();
  const [a, b, c, d, e, f, g, ...res] = link;
  const result = [a, b, c, d, e, f, g];
  let initial = result[0].price;
  let lowest = result[0];
  for (const prices of result) {
    if (prices.price < initial) {
      initial = prices.price;
      lowest = prices;
    }
  }
  console.log(lowest);
  return lowest;

  // const moreFeatured = [a, b, c, d, e, f, g];
  // console.log(moreFeatured);
  // const leastPrice = moreFeatured.reduce((max, price) => {
  //   console.log(`${price} > ${max} = ${price > max}`);
  //   if (price.price > max.price) {
  //     return price;
  //   } else {
  //     return max;
  //   }
  // }, moreFeatured[5]);
  // console.log(`The least Price:${leastPrice}`);

  // return console.log(leastPrice);
  // return sortAlgo(link);
};
// kongaPrice('iphone x');
module.exports = kongaPrice;
