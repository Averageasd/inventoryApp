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
    res.redirect(newCategory.url);
}));

router.post("/delete/:id", asyncHandler(async (req, res, next) => {
    await categoryModel.findByIdAndDelete(req.body.category_id).exec();
    res.redirect("/inventory/category");
}));

router.get('/update/:id', asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id).exec();
    res.render("category_update_form", {category: category});
}));

router.post('/update/:id', asyncHandler(async (req, res, next) => {
    const updatedFields = {
        category_name: req.body.category_name,
        description: req.body.category_desc,
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, updatedFields).exec();
    console.log(updatedCategory);
    res.redirect(updatedCategory.url);
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id).exec();
    res.render("category_detail", {category: category});
}));


module.exports = router;