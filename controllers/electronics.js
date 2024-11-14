const Electronics = require('../models/electronics');

// List of all Electronics
exports.electronics_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics list');
};

// Details of a specific Electronics item
exports.electronics_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics detail: ' + req.params.id);
};

// Handle Electronics creation on POST
exports.electronics_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics create POST');
};

// Handle Electronics delete on DELETE
exports.electronics_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics delete DELETE ' + req.params.id);
};

// Handle Electronics update on PUT
exports.electronics_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics update PUT ' + req.params.id);
};
