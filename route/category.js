const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();


// view all categories in inventory
router.get('/', asyncHandler(async (req, res, next) => {
    res.render('all_categories');
}));


// go to create item page


module.exports = router;