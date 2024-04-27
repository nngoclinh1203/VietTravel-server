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
    }
});

module.exports = mongoose.model("Comment", commentsSchema);