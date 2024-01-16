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
    res.render('index', {items: allItems});
}));

router.post("/create", asyncHandler(async (req, res, next) => {
    let newItem = null;

    if (req.body.category === "") {
        newItem = new itemModel({
            item_name: req.body.item_name,
            description: req.body.item_desc,
            price: req.body.item_price,
            quantity: req.body.item_quantity
        })
    } else {
        newItem = new itemModel({
            item_name: req.body.item_name,
            description: req.body.item_desc,
            category: req.body.category,
            price: req.body.item_price,
            quantity: req.body.item_quantity
        })
    }
    await newItem.save();
    res.redirect(newItem.url);
}));

router.get('/create', asyncHandler(async (req, res, next) => {
    const allCategories = await categgoryModel.find({}).exec();
    res.render("item_create_form", {categories: allCategories});
}));

router.post("/delete/:id", asyncHandler(async (req, res, next) => {
    await itemModel.findByIdAndDelete(req.body.item_id).exec();
    res.redirect("/");
}));

router.get("/update/:id", asyncHandler(async (req, res, next) => {
    const [item, allCategories]
        = await Promise.all([
        itemModel.findById(req.params.id).populate("category", "category_name").exec(),
        await categgoryModel.find({}).exec(),
    ]);
    res.render("item_update_form", {item: item, categories: allCategories});
}));

router.post("/update/:id", asyncHandler(async (req, res, next) => {
    const updatedFields = {
        item_name: req.body.item_name,
        description: req.body.item_desc,
        category: req.body.category,
        price: req.body.item_price,
        quantity: req.body.item_quantity
    };
    if (updatedFields.category === "") {
        delete updatedFields["category"];
    }

    const updatedItem = await itemModel.findOneAndReplace({_id: req.params.id}, updatedFields).exec();
    res.redirect(updatedItem.url);
}));

// express will try to find the match for whatever crud routes we define above and it will stop here.
// reason is :id is a wildcard and it matches everything, including empty character.
router.get("/:id", asyncHandler(async (req, res, next) => {
    const item = await itemModel
        .findById(req.params.id)
        .populate('category', 'category_name')
        .exec();
    res.render("item_detail", {item: item});
}));


module.exports = router;