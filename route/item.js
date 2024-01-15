const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const itemModel = require('../model/itemModel');
const categgoryModel = require('../model/categoryModel');


router.get('/', asyncHandler(async (req, res, next) => {
    const allItems = await itemModel
        .find({})
        .populate('category', 'category_name')
        .exec();
    console.log('all items ', allItems);
    res.render('index', {items: allItems});
}));

router.post("/create", asyncHandler(async (req, res, next) => {
    const newItem = new itemModel({
        item_name: req.body.item_name,
        description: req.body.item_desc,
        category: req.body.category,
        price: req.body.item_price,
        quantity: req.body.item_quantity
    })
    await newItem.save();
    res.redirect(newItem.url);
}));

router.get('/create', asyncHandler(async (req, res, next) => {
    console.log("craete item form");
    const allCategories = await categgoryModel.find({}).exec();
    res.render("item_create_form", {categories: allCategories});
}));

router.post("/delete/:id", asyncHandler(async (req, res, next) => {
    await itemModel.findByIdAndDelete(req.body.item_id).exec();
    res.redirect("/");
}));

router.get("/update/:id", asyncHandler(async (req, res, next) => {

    const item = await itemModel.findById(req.params.id).exec();
    res.render("item_update_form", {item: item});
}));

router.post("/update/:id", asyncHandler(async (req, res, next) => {
    const updatedFields = {
        item_name: req.body.item_name,
        description: req.body.item_desc,
        price: req.body.item_price,
        quantity: req.body.item_quantity
    };
    const updatedItem = await itemModel.findByIdAndUpdate(req.body.item_id, updatedFields).exec();
    res.redirect(updatedItem.url);
}));

// express will try to find the match for whatever crud routes we define above and it will stop here.
// reason is :id is a wildcard and it matches everything, including empty character.
router.get("/:id", asyncHandler(async (req, res, next) => {
    const item = await itemModel.findById(req.params.id).populate('category', 'category_name').exec();
    res.render("item_detail", {item: item});
}));


module.exports = router;