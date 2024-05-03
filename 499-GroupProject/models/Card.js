const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    name:{type: String, required: true},
    number:{type: String, required: true},
    date:{type: String, required: true},
    cvv:{type: String, required: true},
});

module.exports = mongoose.model('Card',cardSchema);