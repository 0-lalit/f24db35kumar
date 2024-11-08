// routes/potion.js
var express = require('express');
var router = express.Router();

/* GET potion page. */
router.get('/', function(req, res, next) {
  res.render('electronics', { title: 'Search Results for Electronics' });
});

module.exports = router;