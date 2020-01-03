const { openBrowser } = require('./index');
const sortAlgo = objectInfo => {
  const moreFeatured = objectInfo.splice(0, 5);
  const leastPrice = moreFeatured.reduce((max, price) => {
    console.log(`${price} > ${max} = ${price > max}`);
    if (price > max) {
      return price;
    } else {
      return max;
    }
  }, 0);
  return leastPrice;
};
const jumiaPrice = async searchParam => {
  const search = searchParam.split(' ').join('-');

  let x = `https://www.jumia.com.ng/catalog/?q=${search}&price_discount=50-100`;

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
    return newArray;
  });
  await browser.close();
  return sortAlgo(link);
};

module.exports = { sortAlgo, jumiaPrice };

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
