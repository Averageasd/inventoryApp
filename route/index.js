const express = require("express");
const router = express.Router();


// view all items in inventory
router.get('/', (req, res, next) => {
    res.redirect('/inventory');
});

// go to create item page


module.exports = router;