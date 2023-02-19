const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema ({
    date: {
        type: Date,
        default: Date.now
    },

    username: {
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

module.exports = mongoose.model('Comments', commentsSchema )