const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: "User"
    },
    historicalSiteId: {
        type: String,
        ref: "HistoricalSite"
    },
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    rate: {
        type: Number
    },
    peopleLiked: [
        {
            type: String,
            ref: "User"
        }
    ],
    numberOfLikes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Comment", commentsSchema);