const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    mrp: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: Object, default: "no profile"},

} );

const Product = mongoose.model('Product', productSchema);

module.exports = Product;