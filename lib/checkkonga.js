const { openBrowser } = require('./index');
const { sortAlgo } = require('./JumiaPrice');
const kongaPrice = async searchParam => {
  if (searchParam == null) return console.log('check what u searched');
  const search = searchParam.split(' ').join('%20');
  const x = `https://www.konga.com/search?search=${search}`;
  const browser = await openBrowser();
  const page = await browser.newPage();
  await page.setDefaultTimeout(0);
  await page.goto(x);
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
  return sortAlgo(link);
};
kongaPrice('iphone x');
module.exports = kongaPrice;
