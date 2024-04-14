const mongoose = require("mongoose");

const historicalSitesSchema = new mongoose.Schema({
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

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    numberPhone: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
})

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

let HistoricalSite = mongoose.model("HistoricalSite", historicalSitesSchema);
let User = mongoose.model("User", usersSchema);
let Comment = mongoose.model("Comment", commentsSchema);

module.exports = {HistoricalSite, User, Comment};