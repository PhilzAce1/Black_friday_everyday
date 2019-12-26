const axios = require('axios');
const cheerio = require('cheerio');

const checkKonga = async product => {
  const search = product.split(' ').join('-');
  const { data: html } = await axios.get(
    `https://www.jumia.com.ng/catalog/?q=iphone-x&price_discount=50-100`
  );
  const $ = cheerio.load(html);
  const recs = [];
  const body = await $('.sku')
    .toArray()
    .map(e =>
      recs.push({
        name: $(e)
          .find('.name')
          .text(),
        price: $(e)
          .find('.price [data-price]')
          .text(),
        link: $(e)
          .find('.link')
          .attr('href')
      })
    );

  for (const x of recs) {
    if (
      x.name === null ||
      x.price === null ||
      x.name === '' ||
      x.price === '' ||
      x.link === undefined ||
      x.name.match(/i[.]phone[.]X/gi) == false
    ) {
      recs.splice(recs.indexOf(x), 1);
    }
  }
  const [a, b, c, d, e, ...res] = recs;
  // console.log(a, b, c);
  const result = [a, b, c, d, e];
  let initial = result[0].price;
  let lowest = result[0];
  for (const prices of result) {
    if (prices.price < initial) {
      initial = prices.price;
      lowest = prices;
    }
  }
  // console.log(recs);
  console.log(lowest);
  return lowest;
};

checkKonga('iphonr x');
module.exports = checkKonga;
/**
 * so what we are going to do next is simple to create an object that we are going to save the link ... price discount given ...do out logic from there
 */
