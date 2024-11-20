var express = require('express');
const electronics_controller = require('../controllers/electronics');  // Changed to electronics_controller
var router = express.Router();
 
// GET request to fetch all electronics
router.get('/', electronics_controller.electronics_list);
 
// POST request to create a new electronic item
router.post('/electronics', electronics_controller.electronics_create_post);

module.exports = router;