var Electronics = require('../models/electronics');  // Import the Electronics model
 
// List all electronics
exports.electronics_list = async function(req, res) {
    try {
        // Fetch all electronics from the database
        const allElectronics = await Electronics.find();  
 
        // Send the list of electronics as a JSON response
        res.render('electronics', { title: 'Electronics Search Results', results: allElectronics });
       
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);  
    }
};
 
// For a specific electronics item
exports.electronics_detail = async function(req, res) {
    try {
        // Find the electronics by id
        const electronics = await Electronics.findById(req.params.id);
 
        if (!electronics) {
            return res.status(404).send('Electronics item not found');
        }
 
        // Send the electronics details as a JSON response
        res.json(electronics);  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};
 
// Handle electronics creation on POST
exports.electronics_create_post = async function(req, res) {
    try {
        // Create a new electronics item using the data in the request body
        const newElectronics = new Electronics({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        });
 
        // Save the new electronics item to the database
        await newElectronics.save();
 
        // Send the newly created electronics item as a JSON response
        res.status(201).json(newElectronics);  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};
 
// Handle electronics deletion on DELETE
exports.electronics_delete = async function(req, res) {
    try {
        // Find the electronics item by id and remove it from the database
        const deletedElectronics = await Electronics.findByIdAndDelete(req.params.id);
 
        if (!deletedElectronics) {
            return res.status(404).send('Electronics item not found');
        }
 
        // Send a message indicating the electronics item was deleted
        res.json({ message: 'Electronics item deleted successfully' });  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};
 
// Handle electronics update on PUT
exports.electronics_update_put = async function(req, res) {
    try {
        // Find the electronics item by id and update it with the new data from the request body
        const updatedElectronics = await Electronics.findByIdAndUpdate(req.params.id, {
            electronics_name: req.body.electronics_name,
            brand: req.body.brand,
            estimated_value: req.body.estimated_value,
            specifications: req.body.specifications,
        }, { new: true });
 
        if (!updatedElectronics) {
            return res.status(404).send('Electronics item not found');
        }
 
        // Send the updated electronics item as a JSON response
        res.json(updatedElectronics);  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};