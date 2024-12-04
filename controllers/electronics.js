var Electronics = require('../models/electronics'); // Import the Electronics model

// List all electronics
exports.electronics_list = async function (req, res) {
    try {
        // Fetch all electronics from the database
        const allElectronics = await Electronics.find();

        // Render the list of electronics
        res.render('electronics', { title: 'Electronics Search Results', results: allElectronics });
    } catch (err) {
        // Return status 500 with the error message
        res.status(500).json({ error: err.message });
    }
};

// For a specific electronic item
exports.electronics_detail = async function (req, res) {
    try {
        // Find the electronic item by id
        const electronic = await Electronics.findById(req.params.id);

        if (!electronic) {
            return res.status(404).json({ error: 'Electronic item not found' });
        }

        // Send the electronic item details as a JSON response
        res.json(electronic);
    } catch (err) {
        // Return status 500 with the error message
        res.status(500).json({ error: err.message });
    }
};

// Handle electronic item creation on POST
exports.electronics_create_post = async function (req, res) {
    try {
        // Create a new electronic item using the data in the request body
        const newElectronic = new Electronics({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        });

        // Save the new electronic item to the database
        await newElectronic.save();

        // Send the newly created electronic item as a JSON response
        res.status(201).json(newElectronic);
    } catch (err) {
        // Return status 400 with the validation error message
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Price must be a valid number and within the defined range.' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};

// Handle electronic item deletion on DELETE
exports.electronics_delete = async function (req, res) {
    try {
        const result = await Electronics.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: 'Electronic item not found' });
        }

        res.json(result);
    } catch (err) {
        // Return status 500 with the error message
        res.status(500).json({ error: err.message });
    }
};

// Handle electronic item update on PUT
exports.electronics_update_put = async function (req, res) {
    try {
        // Validate input against schema
        const updateFields = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        };

        // Update the electronic item and validate using schema rules
        const updatedElectronic = await Electronics.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true } // Ensure schema validation
        );

        if (!updatedElectronic) {
            return res.status(404).json({ error: 'Electronic item not found' });
        }

        // Send the updated electronic item as a JSON response
        res.status(200).json({
            message: 'Electronic item updated successfully!',
            electronic: updatedElectronic
        });
    } catch (err) {
        // Return status 400 with the validation error message
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Price must be a valid number and within the defined range.' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};