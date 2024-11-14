const Electronics = require('../models/electronics'); // Import the Electronics model

// List all electronics
exports.electronics_list = async function(req, res) {
    try {
        // Fetch all electronics from the database
        const allElectronics = await Electronics.find();
        // Render or send the results as JSON response
        res.render('electronics', { title: 'Electronics Search Results', results: allElectronics });
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Retrieve a specific electronics item by ID
exports.electronics_detail = async function(req, res) {
    try {
        // Find electronics item by ID
        const electronics = await Electronics.findById(req.params.id);
        if (!electronics) {
            return res.status(404).send('Electronics item not found');
        }
        // Send the electronics details as JSON response
        res.json(electronics);
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Create a new electronics item
exports.electronics_create_post = async function(req, res) {
    try {
        // Create a new electronics item with data from request body
        const newElectronics = new Electronics({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        });
        // Save the new item to the database
        await newElectronics.save();
        // Return the newly created item as JSON
        res.status(201).json(newElectronics);
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};

exports.electronics_update_put = async function(req, res) {
    console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        // Find the electronics item by ID
        let toUpdate = await Electronics.findById(req.params.id);
        if (!toUpdate) {
            return res.status(404).send(`{"error": "Electronics item with id ${req.params.id} not found"}`);
        }
 
        // Update properties
        toUpdate.name = req.body.name;
        toUpdate.category = req.body.category;
        toUpdate.price = req.body.price;
 
        // Save the updated document
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": "Update for id ${req.params.id} failed due to error: ${err}"}`);
    }
};


// Delete an electronics item by ID
exports.electronics_delete = async function(req, res) {
    try {
        // Find the electronics item by ID and delete it
        const deletedElectronics = await Electronics.findByIdAndDelete(req.params.id);
        if (!deletedElectronics) {
            return res.status(404).send('Electronics item not found');
        }
        // Send a success message for deletion
        res.json({ message: 'Electronics item deleted successfully' });
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};
