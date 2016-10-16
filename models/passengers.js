var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseHidden = require('mongoose-hidden')();

var PassengerSchema = new Schema({
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 15
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 15
    },
    emailAddress: {
        type: String,
        required: true,
        validate: function (val) {
            var re = /[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/;
            return re.test(val);
        }
    },
    password: {
        type: String,
        hide: true,
        required: true,
        minlength: 6,
        maxlength: 16
    },
    addressLine1: {
        type: String,
        maxlength: 50
    },
    addressLine2: {
        type: String,
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 50
    },
    state: {
        type: String,
        minlength: 2,
        maxlength: 2
    },
    zip: {
        type: String,
        minlength: 5,
        maxlength: 5
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: function (val) {
            var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return re.test(val);
        }
    }
});

// PassengerSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Passenger', PassengerSchema);