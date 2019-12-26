const router = require('express').Router();
router.get('/', (req, res) => {
  res.send('i am working');
});
module.exports = router;
