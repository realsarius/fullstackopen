const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    born: {
        type: Number,
    },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('Author', schema);