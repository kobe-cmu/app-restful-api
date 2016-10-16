var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    license: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    model: {
        type: String,
        required: true,
        maxlength: 18
    },
    make: {
        type: String,
        required: true,
        maxlength: 18
    },
    door: {
        type: Number,
        min: 2,
        max: 6,
        required: true
    },
    driver: {
        type: String,
        unique: true,
        ref: 'Driver'
    }
});

module.exports = mongoose.model('Cars', CarSchema);
