const mongoose = require("mongoose");

const historicalSitesSchema = new mongoose.Schema({
    historySiteId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    content: {
        type: String,
        required: true
    },
    coordinates: {
        Longitude: {
            type: Number,
            required: true
        },
        Latitude: {
            type: Number,
            required: true
        }
    },
    rate: {
        type: Number
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("HistoricalSite", historicalSitesSchema);