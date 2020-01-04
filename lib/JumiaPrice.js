// const { openBrowser } = require('./index');
const puppeteer = require('puppeteer');
const openBrowser = async () => {
  return await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
    defaultViewport: null
  });
};
const jumiaPrice = async searchParam => {
  console.clear();
  const search = searchParam.replace(/[^A-Za-z0-9]/g, '+');
  //  .split(' ').join('+');
  let x = `https://www.jumia.com.ng/catalog/?sort=popularity&dir=desc&q=${search}`;
  // let x = `https://www.jumia.com.ng/catalog/?q=${search}&price_discount=50-100&sort=popularity&dir=desc`;
  console.log('opening browser');
  const browser = await openBrowser();
  const page = await browser.newPage();
  await page.setDefaultTimeout(0);
  await page.goto(x);
  const link = await page.evaluate(() => {
    var newArray = [];
    Array.from(document.querySelectorAll('.sku'))
      .filter(
        x =>
          x.querySelector('.name') != null &&
          x.querySelector('.price') != null &&
          x.querySelector('a') != null
      )
      .map(x =>
        newArray.push({
          site: 'Jumia',
          name: x.querySelector('.name').textContent,
          price: x.querySelector('.price').textContent,
          link: x.querySelector('a').href
        })
      );
    console.log('i have finish doing the scraping');
    return newArray;
  });
  console.log('i am do with everything');
  await browser.close();
  // return console.log(link[4]);
  const [a, b, c, ...res] = link;
  const result = [a, b, c];
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

  // const moreFeatured = [a, b, c];

  // console.log(moreFeatured);
  // const leastPrice = moreFeatured.reduce((max, price) => {
  //   console.log(`${price} > ${max} = ${price > max}`);
  //   if (price.price > max.price) {
  //     return price;
  //   } else {
  //     return max;
  //   }
  // }, moreFeatured[0]);
  // console.log(`The least Price:${leastPrice}`);

  // return console.log(leastPrice);
  // return sortAlgo(link);
};

// jumiaPrice('iphone x');
module.exports = jumiaPrice;

// const result = [a, b, c, d, e];
// let initial = result[0].price;
// let lowest = result[0];
// for (const prices of result) {
//   if (prices.price < initial) {
//     initial = prices.price;
//     lowest = prices;
//   }
// }
// // console.log(recs);
// console.log(lowest);
// return lowest;
