var express = require('express');
const electronics_controller = require('../controllers/electronics'); 
const details_controller = require('../controllers/details_controller'); 
var router = express.Router();
 
// GET request to fetch all electronics
router.get('/', electronics_controller.electronics_list);
 
// POST request to create a new electronic item
router.post('/electronics', electronics_controller.electronics_create_post);

router.get('/detail', details_controller.electronics_view_one_Page);

module.exports = router;