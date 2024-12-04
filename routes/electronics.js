var express = require('express');
const electronics_controller = require('../controllers/electronics'); 
const details_controller = require('../controllers/details_controller'); 
var router = express.Router();

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    };
// GET request to fetch all electronics
router.get('/', electronics_controller.electronics_list);

// POST request to create a new electronic item
router.post('/electronics', electronics_controller.electronics_create_post);

router.get('/detail', secured,details_controller.electronics_view_one_Page);
router.get('/create', secured,details_controller.electronics_create_Page);
router.get('/update', secured,details_controller.electronics_update_Page);
router.get('/delete', secured,details_controller.electronics_delete_Page);
module.exports = router;