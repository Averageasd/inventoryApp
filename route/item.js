const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const itemModel = require('../model/itemModel');


router.get('/', asyncHandler(async (req, res, next) => {
    const allItems = await itemModel
        .find({})
        .exec();
    res.render('index', {items: allItems});
}));

router.post("/create", asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const newItem = new itemModel({
        item_name: req.body.item_name,
        description: req.body.item_desc,
        price: req.body.item_price,
        quantity: req.body.item_quantity
    })
    await newItem.save();
    res.redirect("/");
}));

router.get('/create', asyncHandler(async (req, res, next) => {
    res.render("item_create_form");
}));

router.post("/delete/:id", asyncHandler(async (req, res, next) => {
    console.log(req.body.item_id);
    await itemModel.findByIdAndDelete(req.body.item_id).exec();
    res.redirect("/");
}));

router.get("/update/:id", (req,res,next)=>{
   console.log('now update item');
});

module.exports = router;