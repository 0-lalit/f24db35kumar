var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var electronics_controller = require('../controllers/electronics');

/// API ROUTE ///
// GET resources base
// router.get('/', api_controller.api);

/// ELECTRONICS ROUTES ///
// POST request for creating an Electronics item
router.post('/', electronics_controller.electronics_create_post);

// DELETE request to delete an Electronics item
router.delete('/:id', electronics_controller.electronics_delete);

// PUT request to update an Electronics item
router.put('/:id', electronics_controller.electronics_update_put);

// GET request for one Electronics item
router.get('/:id', electronics_controller.electronics_detail);

// GET request for list of all Electronics items
router.get('/', electronics_controller.electronics_list);

module.exports = router;
