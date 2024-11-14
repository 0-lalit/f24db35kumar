const express = require('express');
const router = express.Router();
 
// Require controller modules
const api_controller = require('../controllers/api');
const electronics_controller = require('../controllers/electronics');  // Changed to electronicsController
 
/// API ROUTE ///
 
// GET request for API base
router.get('/', api_controller.api);
 
// Electronics Routes
router.get('/electronics', electronics_controller.electronics_list); // GET request for list of all Electronics
router.post('/electronics', electronics_controller.electronics_create_post); // POST request for creating an Electronics item
router.get('/electronics/:id', electronics_controller.electronics_detail); // GET request for a specific Electronics item
router.put('/electronics/:id', electronics_controller.electronics_update_put); // PUT request to update an Electronics item
router.delete('/electronics/:id', electronics_controller.electronics_delete); // DELETE request to delete an Electronics item
 
module.exports = router;
