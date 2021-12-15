const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    comment: {type: Object,required: true},
    profile: {type: String,default: "no profile"},

} );

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;