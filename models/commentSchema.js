const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: "No comment was left.",
    required: true,
    trim: true
  },
  datestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports.commentModel =mongoose.model('comment',commentSchema);
module.exports.commentSchema=commentSchema;