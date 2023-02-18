const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema ({
    date: {
        type: Date,
        default: Date.now
    },

    user: {
        type: String,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
        
    },


})

module.exports = Comment = mongoose.model('Comments', commentsSchema )