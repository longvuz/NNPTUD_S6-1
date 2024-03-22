var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    year: Number,
    author: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = new mongoose.model('book', bookSchema)