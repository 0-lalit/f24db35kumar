// grid.js (route handler)
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // Get query parameters for rows and columns
  let query = req.query;
  console.log(`Rows: ${query.rows}, Cols: ${query.cols}`);

  // Pass query parameters to pug template
  res.render('grid', { title: "Grid Display", query: query });
});

module.exports = router;
