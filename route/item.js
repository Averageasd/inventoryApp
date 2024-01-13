const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const itemModel = require('../model/itemModel');
router.get('/', asyncHandler(async (req, res, next) => {
    res.render("index");
}));

router.get('/create',(req,res,next)=>{

});
module.exports = router;