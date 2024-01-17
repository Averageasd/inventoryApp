const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_name: {type: String, required: true, minLength: 3, maxLength: 30},
    description: {type: String, required: true, minLength: 3, maxLength: 500},
    price: {type: Number, required: true, min: 5, max: 100},
    quantity: {type: Number, required: true, min: 0, max: 10},
    category: {type: Schema.Types.ObjectId, ref: "Category"}
});

ItemSchema.virtual("url").get(function () {
    return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);