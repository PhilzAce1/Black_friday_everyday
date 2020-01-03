const router = require('express').Router();
const { runScraper } = require('../lib/index');
router.get('/', async (req, res) => {
  const { search } = req.body;
  const bestPrice = await runScraper(search);
  res.send(bestPrice);
});
module.exports = router;
