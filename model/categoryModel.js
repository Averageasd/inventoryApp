const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: {type: String, required: true, minLength: 3, maxLength: 30},
    description: {type: String, required: true, minLength: 3, maxLength: 500},
});

CategorySchema.virtual("url").get(function () {
    return `/inventory/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);