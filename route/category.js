const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const categoryModel = require('../model/categoryModel');


// view all categories in inventory
router.get('/', asyncHandler(async (req, res, next) => {
    const allCategories = await categoryModel.find({}).exec();
    console.log(allCategories);
    res.render('all_categories', {categories: allCategories});
}));

router.get('/create', (req, res, next) => {
    res.render("category_create_form");
});

router.post('/create', asyncHandler(async (req, res, next) => {
    const newCategory = new categoryModel({
        category_name: req.body.category_name,
        description: req.body.category_desc,
    })

    await newCategory.save();
    res.redirect("/inventory/category");
}));


// go to create item page


module.exports = router;