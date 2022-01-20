const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const businessSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    registrationNo: {type: String, required: true},
} );

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;