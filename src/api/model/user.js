const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
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
        required: true,
        enum: ['visitor', 'user', 'admin'] // Giá trị của `role` chỉ có thể là 'user' hoặc 'admin', 'visitor'
    },
    avatar: {
        type: String  // Đường dẫn đến ảnh đại diện
    },
    numOfVisitedSites: {
        type: Number,
        default: 0
    },
    numOfLikedSites: {
        type: Number,
        default: 0
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);