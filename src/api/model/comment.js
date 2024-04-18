const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    historicalSite: {
        type: mongoose.Schema.Types.ObjectId,
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