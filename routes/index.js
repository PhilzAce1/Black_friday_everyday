const router = require('express').Router();
const runScraper = require('../lib/index');
router.get('/', async (req, res) => {
  const { search } = req.query || req.body || req.param;
  const bestPrice = await runScraper(search);
  console.log(search);
  console.log(bestPrice);
  res.send(bestPrice);
});
module.exports = router;
