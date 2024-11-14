var Electronics = require('../models/electronics');  // Import the Electronics model
 
// List all electronics
exports.electronics_list = async function(req, res) {
    try {
        // Fetch all electronics from the database
        const allElectronics = await Electronics.find();  
 
        // Send the list of electronics as a JSON response
        // res.json(allElectronics);  
        res.render('electronics', { title: 'Electronics Search Results', results: allElectronics });
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);  
    }
};
 
// For a specific electronic item
exports.electronics_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics detail: ' + req.params.id);
};
 
// Handle electronics creation on POST
exports.electronics_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics create POST');
};
 
// Handle electronics deletion on DELETE
exports.electronics_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics delete DELETE ' + req.params.id);
};
 
// Handle electronics update on PUT
exports.electronics_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Electronics update PUT ' + req.params.id);
};
