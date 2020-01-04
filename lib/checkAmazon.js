const { openBrowser } = require('./index');
const amazonPrice = async searchParam => {
  if (!searchParam) return console.log('check your input');
  const search = searchParam.split(' ').join('+');
  const x = `https://www.amazon.com/s?k=${search}`;
  const browser = await openBrowser();
  const page = await browser.newPage();
  await page.setDefaultTimeout(0);
  await page.goto(x);
  const name = '';
  df;

  //   '.sg-col-inner > .sg-row > .sg-col-4-of-12 > .sg-col-inner > .a-section > .a-size-mini > a > .a-size-medium'
  //   '.sg-col-4-of-12 >.sg-col-inner > .a-section > .a-size-mini > a > .a-size-medium'
  //   ('.sg-col-4-of-12  .sg-col-inner > .a-section > .a-size-mini > a > .a-size-medium');
  const link = await page.evaluate(() => {
    // var newArray = [];

    const val = Array.from(
      document.querySelectorAll('.sg-col-inner > .sg-row  ')
    ).filter(
      x =>
        x.querySelector(
          '.sg-col-4-of-12  .sg-col-inner > .a-section > .a-size-mini > a > .a-size-medium'
        ) != null
    );
    let i = 0;

    return val.map(x => {
      Array.from(
        document.querySelectorAll(
          ' .sg-col-inner > .sg-row  span.a-price-whole'
        )
      )[val.indexOf(x)];
    });
    Array.from(
      document.querySelector(' .sg-col-inner > .sg-row  span.a-price-whole')
    )[val.indexOf(x)].textContent;
    return Array.from(document.querySelectorAll('.sg-col-inner'))
      .filter(x => x.querySelector(name) != null)
      .map(x => x.querySelector(name).textContent)
      .filter(
        x =>
          x.querySelector(
            '.sg-col-inner > .a-section > .a-size-mini > a > .a-size-medium'
          ) != null
      );
  });
  return console.log(link);
};

amazonPrice('iphone x');
